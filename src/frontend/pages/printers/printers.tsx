import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchPrinters } from "../../services/slices/printers";
import {
  Printer,
  Cartridge,
  updatePrinter,
  createPrinter,
  uploadImage,
  getPaginatedCartridges,
  getCartridgesByPrinterId,
  createCompatibility,
  deleteCompatibility,
  getPaginatedCompatibilities,
  getPrinterVendors,
} from "../../utils/api";
import { DeviceSearch } from "../../components/device-search/device-search";
import styles from "./printers.module.css";

export const PrintersPage: React.FC = () => {
  const dispatch = useDispatch_();
  const { items, isLoading, error, pagination } = useSelector_((state) => state.printers);
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [hasImageFilter, setHasImageFilter] = useState<string>("all");
  const [hasLinkedCartridgesFilter, setHasLinkedCartridgesFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<Printer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [vendors, setVendors] = useState<string[]>([]);
  const [linkedCartridgesMap, setLinkedCartridgesMap] = useState<Map<string, Cartridge[]>>(new Map());
  const [isLoadingLinkedDevices, setIsLoadingLinkedDevices] = useState<boolean>(false);

  useEffect(() => {
    // Загружаем всех производителей из базы (все производители, не только текущей страницы)
    loadVendors();
  }, []);

  useEffect(() => {
    // Загружаем данные при изменении страницы или фильтров
    dispatch(fetchPrinters({ page: currentPage, limit: 30, vendor: vendorFilter || undefined }));
  }, [dispatch, currentPage, vendorFilter]);

  useEffect(() => {
    // Загружаем связанные картриджи для всех принтеров
    if (items.length > 0) {
      loadLinkedCartridgesForAll();
    } else {
      setLinkedCartridgesMap(new Map());
    }
  }, [items]);

  const loadVendors = async () => {
    try {
      const response = await getPrinterVendors();
      if (response && response.data) {
        setVendors(response.data);
      }
    } catch (error) {
      console.error("Ошибка загрузки производителей:", error);
    }
  };

  const loadLinkedCartridgesForAll = async () => {
    setIsLoadingLinkedDevices(true);
    const map = new Map<string, Cartridge[]>();
    try {
      await Promise.all(
        items.map(async (printer) => {
          try {
            const response = await getCartridgesByPrinterId(printer._id);
            map.set(printer._id, response.data || []);
          } catch (error) {
            map.set(printer._id, []);
          }
        })
      );
      setLinkedCartridgesMap(map);
    } catch (error) {
      console.error("Ошибка загрузки связанных картриджей:", error);
    } finally {
      setIsLoadingLinkedDevices(false);
    }
  };

  // Проверяем наличие изображения (для будущей реализации)
  const hasImage = (printer: Printer): boolean => {
    return false; // Пока нет изображений у принтеров
  };

  // Фильтруем данные (только фильтры, которые нельзя сделать на сервере)
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Фильтр по картинке
      if (hasImageFilter === "yes" && !hasImage(item)) return false;
      if (hasImageFilter === "no" && hasImage(item)) return false;
      
      // Фильтр по связанным картриджам (применяем только если данные загружены для этого элемента)
      if (hasLinkedCartridgesFilter !== "all") {
        const linkedCartridges = linkedCartridgesMap.get(item._id);
        // Если данных еще нет для этого элемента, пропускаем фильтрацию (включаем элемент)
        if (linkedCartridges === undefined) {
          return true;
        }
        // Применяем фильтр только когда данные загружены
        if (hasLinkedCartridgesFilter === "yes" && linkedCartridges.length === 0) return false;
        if (hasLinkedCartridgesFilter === "no" && linkedCartridges.length > 0) return false;
      }
      
      return true;
    });
  }, [items, hasImageFilter, hasLinkedCartridgesFilter, linkedCartridgesMap]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className={styles.title}>Принтеры</h1>
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
            onChange={(e) => {
              setVendorFilter(e.target.value);
              setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтра
            }}
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
        <div className={styles.filterGroup}>
          <label>Наличие картинки:</label>
          <select
            value={hasImageFilter}
            onChange={(e) => setHasImageFilter(e.target.value)}
            className={styles.select}
          >
            <option value="all">Все</option>
            <option value="yes">Есть</option>
            <option value="no">Нет</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Наличие связанных картриджей:</label>
          <select
            value={hasLinkedCartridgesFilter}
            onChange={(e) => setHasLinkedCartridgesFilter(e.target.value)}
            className={styles.select}
          >
            <option value="all">Все</option>
            <option value="yes">Есть</option>
            <option value="no">Нет</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Картинка</th>
              <th>Модель</th>
              <th>Производитель</th>
              <th>Устройство</th>
              <th>Тип</th>
              <th>Формат</th>
              <th>Привязанные картриджи</th>
              <th>Ресурс</th>
              <th>Скорость</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((printer) => (
              <tr
                key={printer._id}
                onClick={() => {
                  setSelectedItem(printer);
                  setIsModalOpen(true);
                }}
                className={styles.tableRow}
              >
                <td>
                  {hasImage(printer) ? (
                    <span className={styles.statusIcon} style={{ color: "green" }}>✓</span>
                  ) : (
                    <span className={styles.statusIcon} style={{ color: "red" }}>✗</span>
                  )}
                </td>
                <td>{printer.model}</td>
                <td>{printer.vendor}</td>
                <td>{printer.device || "-"}</td>
                <td>{printer.type || "-"}</td>
                <td>{printer.format || "-"}</td>
                <td>
                  {(() => {
                    const linkedCartridges = linkedCartridgesMap.get(printer._id) || [];
                    if (linkedCartridges.length > 0) {
                      return linkedCartridges.map(c => `${c.vendor} ${c.modelCart}`).join(", ");
                    }
                    return "Нет привязанных картриджей";
                  })()}
                </td>
                <td>{printer.capacity ? `${printer.capacity} стр.` : "-"}</td>
                <td>{printer.speed ? `${printer.speed} стр/мин` : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredItems.length === 0 && (
        <div className={styles.empty}>Принтеры не найдены</div>
      )}

      {pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Назад
          </button>
          <span className={styles.paginationInfo}>
            Страница {pagination.currentPage} из {pagination.totalPages} ({pagination.totalItems} всего)
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))}
            disabled={currentPage === pagination.totalPages}
            className={styles.paginationButton}
          >
            Вперёд
          </button>
        </div>
      )}

      {isModalOpen && selectedItem && (
        <EditPrinterModal
          printer={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={() => {
            dispatch(fetchPrinters({ page: currentPage, limit: 30, vendor: vendorFilter || undefined })).then(() => {
              loadLinkedCartridgesForAll();
            });
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {isCreateModalOpen && (
        <CreatePrinterModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={() => {
            dispatch(fetchPrinters({ page: currentPage, limit: 30, vendor: vendorFilter || undefined })).then(() => {
              loadLinkedCartridgesForAll();
            });
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Компонент модального окна для редактирования принтера
const EditPrinterModal: React.FC<{
  printer: Printer;
  onClose: () => void;
  onSave: () => void;
}> = ({ printer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    vendor: printer.vendor || "",
    model: printer.model || "",
    device: printer.device || "",
    type: printer.type || "",
    format: printer.format || "",
    capacity: printer.capacity || "",
    speed: printer.speed || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  
  // Состояние для привязки картриджей
  const [allCartridges, setAllCartridges] = useState<Cartridge[]>([]);
  const [selectedCartridges, setSelectedCartridges] = useState<Cartridge[]>([]);
  const [linkedCartridges, setLinkedCartridges] = useState<Cartridge[]>([]);
  const [compatibilityMap, setCompatibilityMap] = useState<Map<string, string>>(new Map()); // cartridgeId -> compatibilityId
  const [isLoadingCartridges, setIsLoadingCartridges] = useState(false);

  useEffect(() => {
    // Загружаем все картриджи и связанные картриджи
    loadCartridges();
    loadLinkedCartridges();
  }, [printer._id]);

  const loadCartridges = async () => {
    try {
      setIsLoadingCartridges(true);
      const response = await getPaginatedCartridges({ page: 1, limit: 10000 });
      setAllCartridges(response.data);
    } catch (error) {
      console.error("Ошибка загрузки картриджей:", error);
    } finally {
      setIsLoadingCartridges(false);
    }
  };

  const loadLinkedCartridges = async () => {
    try {
      const response = await getCartridgesByPrinterId(printer._id);
      setLinkedCartridges(response.data);
      
      // Загружаем ID связей для каждого картриджа
      const compatibilities = await getPaginatedCompatibilities({ printerId: printer._id, limit: 1000 });
      const map = new Map<string, string>();
      compatibilities.data.forEach((comp) => {
        map.set(comp.cartridgeId, comp._id);
      });
      setCompatibilityMap(map);
    } catch (error) {
      console.error("Ошибка загрузки связанных картриджей:", error);
    }
  };

  const handleCartridgeSelect = (cartridge: Cartridge) => {
    if (!selectedCartridges.find((c) => c._id === cartridge._id)) {
      setSelectedCartridges([...selectedCartridges, cartridge]);
    }
  };

  const handleCreateCompatibility = async () => {
    if (selectedCartridges.length === 0) return;
    
    try {
      for (const cartridge of selectedCartridges) {
        try {
          await createCompatibility({
            cartridgeId: cartridge._id,
            printerId: printer._id,
          });
        } catch (error: any) {
          // Игнорируем ошибки о существующей связи
          if (error.response?.status !== 409) {
            console.error("Ошибка создания связи:", error);
          }
        }
      }
      setSelectedCartridges([]);
      await loadLinkedCartridges();
    } catch (error) {
      console.error("Ошибка при создании связей:", error);
      alert("Ошибка при создании связей");
    }
  };

  const handleDeleteCompatibility = async (cartridgeId: string) => {
    const compatibilityId = compatibilityMap.get(cartridgeId);
    if (!compatibilityId) return;
    
    try {
      await deleteCompatibility(compatibilityId);
      await loadLinkedCartridges();
    } catch (error) {
      console.error("Ошибка при удалении связи:", error);
      alert("Ошибка при удалении связи");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updatePrinter(printer._id, {
        ...formData,
        capacity: formData.capacity ? parseFloat(formData.capacity as any) : undefined,
        speed: formData.speed ? parseFloat(formData.speed as any) : undefined,
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
          <h2>Редактировать принтер</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
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
            <label>Модель *</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Устройство</label>
            <select
              value={formData.device}
              onChange={(e) => setFormData({ ...formData, device: e.target.value })}
            >
              <option value="">Не указано</option>
              <option value="printer">Принтер</option>
              <option value="MFU">МФУ</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Тип</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="">Не указано</option>
              <option value="mono">Монохромный</option>
              <option value="color">Цветной</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Формат</label>
            <select
              value={formData.format}
              onChange={(e) => setFormData({ ...formData, format: e.target.value })}
            >
              <option value="">Не указано</option>
              <option value="A4">A4</option>
              <option value="A3">A3</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Ресурс (страниц)</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Скорость (стр/мин)</label>
            <input
              type="number"
              value={formData.speed}
              onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Привязать картриджи</label>
            {isLoadingCartridges ? (
              <div>Загрузка картриджей...</div>
            ) : (
              <>
                <DeviceSearch
                  items={allCartridges}
                  onSelect={handleCartridgeSelect}
                  placeholder="Поиск картриджа по модели или производителю..."
                  displayField="modelCart"
                  searchFields={["modelCart", "vendor"]}
                />
                {selectedCartridges.length > 0 && (
                  <button
                    type="button"
                    onClick={handleCreateCompatibility}
                    className={styles.linkButton}
                  >
                    Привязать выбранные картриджи ({selectedCartridges.length})
                  </button>
                )}
                {linkedCartridges.length > 0 && (
                  <div className={styles.linkedItems}>
                    <label>Связанные картриджи:</label>
                    {linkedCartridges.map((cartridge: Cartridge) => (
                      <div key={cartridge._id} className={styles.linkedItem}>
                        <span>{cartridge.vendor} {cartridge.modelCart}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteCompatibility(cartridge._id)}
                          className={styles.deleteLinkButton}
                        >
                          Удалить связь
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
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

// Компонент модального окна для создания принтера
const CreatePrinterModal: React.FC<{
  onClose: () => void;
  onSave: () => void;
}> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    vendor: "",
    model: "",
    device: "",
    type: "",
    format: "",
    capacity: "",
    speed: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Состояние для привязки картриджей
  const [allCartridges, setAllCartridges] = useState<Cartridge[]>([]);
  const [selectedCartridges, setSelectedCartridges] = useState<Cartridge[]>([]);
  const [isLoadingCartridges, setIsLoadingCartridges] = useState(false);

  useEffect(() => {
    loadCartridges();
  }, []);

  const loadCartridges = async () => {
    try {
      setIsLoadingCartridges(true);
      const response = await getPaginatedCartridges({ page: 1, limit: 10000 });
      setAllCartridges(response.data);
    } catch (error) {
      console.error("Ошибка загрузки картриджей:", error);
    } finally {
      setIsLoadingCartridges(false);
    }
  };

  const handleCartridgeSelect = (cartridge: Cartridge) => {
    if (!selectedCartridges.find((c) => c._id === cartridge._id)) {
      setSelectedCartridges([...selectedCartridges, cartridge]);
    }
  };

  const handleRemoveCartridge = (cartridgeId: string) => {
    setSelectedCartridges(selectedCartridges.filter((c) => c._id !== cartridgeId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Создаем принтер
      const printerData = {
        vendor: formData.vendor.trim(),
        model: formData.model.trim(),
        device: formData.device.trim() || undefined,
        type: formData.type.trim() || undefined,
        format: formData.format.trim() || undefined,
        capacity: formData.capacity ? parseFloat(formData.capacity) : undefined,
        speed: formData.speed ? parseFloat(formData.speed) : undefined,
      };

      const createdPrinter = await createPrinter(printerData);
      const printerId = createdPrinter.data._id;

      // Загружаем изображение если есть
      if (imageFile) {
        try {
          await uploadImage(imageFile, { printerId });
        } catch (error) {
          console.error("Ошибка загрузки изображения:", error);
        }
      }

      // Создаем связи с картриджами
      if (selectedCartridges.length > 0) {
        for (const cartridge of selectedCartridges) {
          try {
            await createCompatibility({
              cartridgeId: cartridge._id,
              printerId,
            });
          } catch (error: any) {
            // Игнорируем ошибки о существующей связи
            if (error.response?.status !== 409) {
              console.error("Ошибка создания связи:", error);
            }
          }
        }
      }

      onSave();
    } catch (error: any) {
      console.error("Ошибка создания принтера:", error);
      alert(error.response?.data?.error || "Ошибка создания принтера");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Добавить принтер</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
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
            <label>Модель *</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Устройство</label>
            <input
              type="text"
              value={formData.device}
              onChange={(e) => setFormData({ ...formData, device: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Тип</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Формат</label>
            <select
              value={formData.format}
              onChange={(e) => setFormData({ ...formData, format: e.target.value })}
            >
              <option value="">Не указано</option>
              <option value="A4">A4</option>
              <option value="A3">A3</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Ресурс (страниц)</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Скорость (стр/мин)</label>
            <input
              type="number"
              value={formData.speed}
              onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
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

          <div className={styles.linkedItems}>
            <label>Привязать картриджи</label>
            {isLoadingCartridges ? (
              <div>Загрузка картриджей...</div>
            ) : (
              <>
                <DeviceSearch
                  items={allCartridges}
                  onSelect={handleCartridgeSelect}
                  placeholder="Поиск картриджа..."
                  displayField="modelCart"
                  searchFields={["modelCart", "vendor"]}
                />
                {selectedCartridges.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    {selectedCartridges.map((cartridge) => (
                      <div key={cartridge._id} className={styles.linkedItem}>
                        <span>{cartridge.vendor} {cartridge.modelCart}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCartridge(cartridge._id)}
                          className={styles.deleteLinkButton}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
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
