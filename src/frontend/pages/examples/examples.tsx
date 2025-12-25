import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchExamples } from "../../services/slices/examples";
import { Example, updateExample, createExample, uploadVideo } from "../../utils/api";
import styles from "./examples.module.css";

export const ExamplesPage: React.FC = () => {
  const dispatch = useDispatch_();
  const { items, isLoading, error, pagination } = useSelector_((state) => state.examples);
  const [selectedItem, setSelectedItem] = useState<Example | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchExamples({ page: 1, limit: 1000 }));
  }, [dispatch]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className={styles.title}>Примеры</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className={styles.addButton}
        >
          Добавить
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Заголовок</th>
              <th>Текст</th>
              <th>Картридж ID</th>
              <th>Принтер ID</th>
              <th>Ноутбук ID</th>
            </tr>
          </thead>
          <tbody>
            {items.map((example) => (
              <tr
                key={example._id}
                onClick={() => {
                  setSelectedItem(example);
                  setIsModalOpen(true);
                }}
                className={styles.tableRow}
              >
                <td>{example.title}</td>
                <td className={styles.textCell}>
                  <div dangerouslySetInnerHTML={{ __html: example.text.substring(0, 100) + (example.text.length > 100 ? "..." : "") }} />
                </td>
                <td>{example.cartridgeId || "-"}</td>
                <td>{example.printerId || "-"}</td>
                <td>{example.laptopId || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length === 0 && (
        <div className={styles.empty}>Примеры не найдены</div>
      )}

      {isModalOpen && selectedItem && (
        <EditExampleModal
          example={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={() => {
            dispatch(fetchExamples({ page: 1, limit: 1000 }));
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {isCreateModalOpen && (
        <CreateExampleModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={() => {
            dispatch(fetchExamples({ page: 1, limit: 1000 }));
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Компонент модального окна для редактирования примера
const EditExampleModal: React.FC<{
  example: Example;
  onClose: () => void;
  onSave: () => void;
}> = ({ example, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: example.title || "",
    text: example.text || "",
    cartridgeId: example.cartridgeId || "",
    printerId: example.printerId || "",
    laptopId: example.laptopId || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateExample(example._id, {
        ...formData,
        cartridgeId: formData.cartridgeId || undefined,
        printerId: formData.printerId || undefined,
        laptopId: formData.laptopId || undefined,
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
          <h2>Редактировать пример</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Заголовок *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Текст (HTML) *</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              required
              rows={10}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Картридж ID</label>
            <input
              type="text"
              value={formData.cartridgeId}
              onChange={(e) => setFormData({ ...formData, cartridgeId: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Принтер ID</label>
            <input
              type="text"
              value={formData.printerId}
              onChange={(e) => setFormData({ ...formData, printerId: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Ноутбук ID</label>
            <input
              type="text"
              value={formData.laptopId}
              onChange={(e) => setFormData({ ...formData, laptopId: e.target.value })}
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

// Компонент модального окна для создания примера
const CreateExampleModal: React.FC<{
  onClose: () => void;
  onSave: () => void;
}> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    cartridgeId: "",
    printerId: "",
    laptopId: "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const exampleData = {
        title: formData.title.trim(),
        text: formData.text.trim(),
        cartridgeId: formData.cartridgeId.trim() || undefined,
        printerId: formData.printerId.trim() || undefined,
        laptopId: formData.laptopId.trim() || undefined,
      };

      const createdExample = await createExample(exampleData);
      const exampleId = createdExample.data._id;

      // Загружаем видео если есть
      if (videoFile) {
        try {
          await uploadVideo(videoFile, { exampleId });
        } catch (error) {
          console.error("Ошибка загрузки видео:", error);
        }
      }

      onSave();
    } catch (error: any) {
      console.error("Ошибка создания примера:", error);
      alert(error.response?.data?.error || "Ошибка создания примера");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Добавить пример</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Заголовок *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Текст (HTML) *</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              required
              rows={10}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Картридж ID</label>
            <input
              type="text"
              value={formData.cartridgeId}
              onChange={(e) => setFormData({ ...formData, cartridgeId: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Принтер ID</label>
            <input
              type="text"
              value={formData.printerId}
              onChange={(e) => setFormData({ ...formData, printerId: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Ноутбук ID</label>
            <input
              type="text"
              value={formData.laptopId}
              onChange={(e) => setFormData({ ...formData, laptopId: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Видео</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
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
