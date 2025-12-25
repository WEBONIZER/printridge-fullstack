import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchLaptops } from "../../services/slices/laptops";
import { Laptop, createLaptop, uploadImage } from "../../utils/api";
import styles from "./laptops.module.css";

export const LaptopsPage: React.FC = () => {
  const dispatch = useDispatch_();
  const { items, isLoading, error, pagination } = useSelector_((state) => state.laptops);
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [hasImageFilter, setHasImageFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<Laptop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchLaptops({ page: 1, limit: 1000 }));
  }, [dispatch]);

  // Получаем уникальные производители
  const vendors = useMemo(() => {
    const uniqueVendors = new Set(items.map((item) => item.vendor).filter(Boolean));
    return Array.from(uniqueVendors).sort();
  }, [items]);

  // Фильтруем данные
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (vendorFilter && item.vendor !== vendorFilter) return false;
      // Для ноутбуков пока нет изображений, но оставляем логику для будущего
      return true;
    });
  }, [items, vendorFilter, hasImageFilter]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className={styles.title}>Ноутбуки</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className={styles.addButton}
        >
          Добавить
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Производитель:</label>
          <select
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
            className={styles.select}
          >
            <option value="">Все</option>
            {vendors.map((vendor) => (
              <option key={vendor} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Модель</th>
              <th>Серия</th>
              <th>Производитель</th>
              <th>Диагональ</th>
              <th>Процессор</th>
              <th>Видеокарта</th>
              <th>ОЗУ</th>
              <th>Тип ОЗУ</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((laptop) => (
              <tr
                key={laptop._id}
                onClick={() => {
                  setSelectedItem(laptop);
                  setIsModalOpen(true);
                }}
                className={styles.tableRow}
              >
                <td>{laptop.model}</td>
                <td>{laptop.series || "-"}</td>
                <td>{laptop.vendor}</td>
                <td>{laptop.display ? `${laptop.display}"` : "-"}</td>
                <td>{laptop.processorName || "-"}</td>
                <td>{laptop.video || "-"}</td>
                <td>{laptop.ram ? `${laptop.ram} GB` : "-"}</td>
                <td>{laptop.ramType || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredItems.length === 0 && (
        <div className={styles.empty}>Ноутбуки не найдены</div>
      )}

      {isModalOpen && selectedItem && (
        <EditLaptopModal
          laptop={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={() => {
            dispatch(fetchLaptops({ page: 1, limit: 1000 }));
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {isCreateModalOpen && (
        <CreateLaptopModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={() => {
            dispatch(fetchLaptops({ page: 1, limit: 1000 }));
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Компонент модального окна для редактирования ноутбука
const EditLaptopModal: React.FC<{
  laptop: Laptop;
  onClose: () => void;
  onSave: () => void;
}> = ({ laptop, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    model: laptop.model || "",
    series: laptop.series || "",
    vendor: laptop.vendor || "",
    display: laptop.display || "",
    processor: laptop.processor || "",
    processorVendor: laptop.processorVendor || "",
    processorName: laptop.processorName || "",
    video: laptop.video || "",
    ram: laptop.ram || "",
    ramType: laptop.ramType || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { updateLaptop } = await import("../../utils/api");
      await updateLaptop(laptop._id, {
        ...formData,
        display: formData.display ? parseFloat(formData.display as any) : undefined,
        processor: formData.processor ? parseFloat(formData.processor as any) : undefined,
        ram: formData.ram ? parseFloat(formData.ram as any) : undefined,
      });
      onSave();
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Редактировать ноутбук</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Модель *</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Серия</label>
            <input
              type="text"
              value={formData.series}
              onChange={(e) => setFormData({ ...formData, series: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Производитель *</label>
            <input
              type="text"
              value={formData.vendor}
              onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Диагональ (дюймы)</label>
            <input
              type="number"
              step="0.1"
              value={formData.display}
              onChange={(e) => setFormData({ ...formData, display: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Частота процессора (ГГц)</label>
            <input
              type="number"
              step="0.1"
              value={formData.processor}
              onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Производитель процессора</label>
            <input
              type="text"
              value={formData.processorVendor}
              onChange={(e) => setFormData({ ...formData, processorVendor: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Название процессора</label>
            <input
              type="text"
              value={formData.processorName}
              onChange={(e) => setFormData({ ...formData, processorName: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Видеокарта</label>
            <input
              type="text"
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>ОЗУ (GB)</label>
            <input
              type="number"
              value={formData.ram}
              onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Тип ОЗУ</label>
            <input
              type="text"
              value={formData.ramType}
              onChange={(e) => setFormData({ ...formData, ramType: e.target.value })}
            />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} disabled={isSaving}>
              Отмена
            </button>
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Компонент модального окна для создания ноутбука
const CreateLaptopModal: React.FC<{
  onClose: () => void;
  onSave: () => void;
}> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    model: "",
    series: "",
    vendor: "",
    display: "",
    processor: "",
    processorVendor: "",
    processorName: "",
    video: "",
    ram: "",
    ramType: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const laptopData = {
        model: formData.model.trim(),
        series: formData.series.trim() || undefined,
        vendor: formData.vendor.trim(),
        display: formData.display ? parseFloat(formData.display) : undefined,
        processor: formData.processor ? parseFloat(formData.processor) : undefined,
        processorVendor: formData.processorVendor.trim() || undefined,
        processorName: formData.processorName.trim() || undefined,
        video: formData.video.trim() || undefined,
        ram: formData.ram ? parseFloat(formData.ram) : undefined,
        ramType: formData.ramType.trim() || undefined,
      };

      const createdLaptop = await createLaptop(laptopData);
      const laptopId = createdLaptop.data._id;

      // Загружаем изображение если есть
      if (imageFile) {
        try {
          await uploadImage(imageFile, { laptopId });
        } catch (error) {
          console.error("Ошибка загрузки изображения:", error);
        }
      }

      onSave();
    } catch (error: any) {
      console.error("Ошибка создания ноутбука:", error);
      alert(error.response?.data?.error || "Ошибка создания ноутбука");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Добавить ноутбук</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Модель *</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Серия</label>
            <input
              type="text"
              value={formData.series}
              onChange={(e) => setFormData({ ...formData, series: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Производитель *</label>
            <input
              type="text"
              value={formData.vendor}
              onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Диагональ</label>
            <input
              type="number"
              value={formData.display}
              onChange={(e) => setFormData({ ...formData, display: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Процессор</label>
            <input
              type="number"
              value={formData.processor}
              onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Производитель процессора</label>
            <input
              type="text"
              value={formData.processorVendor}
              onChange={(e) => setFormData({ ...formData, processorVendor: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Название процессора</label>
            <input
              type="text"
              value={formData.processorName}
              onChange={(e) => setFormData({ ...formData, processorName: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Видеокарта</label>
            <input
              type="text"
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>ОЗУ (GB)</label>
            <input
              type="number"
              value={formData.ram}
              onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Тип ОЗУ</label>
            <input
              type="text"
              value={formData.ramType}
              onChange={(e) => setFormData({ ...formData, ramType: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Изображение</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} disabled={isSaving}>
              Отмена
            </button>
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Сохранение..." : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

