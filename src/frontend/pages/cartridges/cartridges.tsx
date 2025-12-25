import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchCartridges } from "../../services/slices/cartridges";
import {
  Cartridge,
  Printer,
  updateCartridge,
  createCartridge,
  uploadImage,
  updateImage,
  getPaginatedPrinters,
  getPrintersByCartridgeId,
  createCompatibility,
  deleteCompatibility,
  getPaginatedCompatibilities,
  getCartridgeVendors,
  getCartridgesByPrinterId,
} from "../../utils/api";
import { DeviceSearch } from "../../components/device-search/device-search";
import styles from "./cartridges.module.css";

export const CartridgesPage: React.FC = () => {
  const dispatch = useDispatch_();
  const { items, isLoading, error, pagination } = useSelector_((state) => state.cartridges);
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [hasImageFilter, setHasImageFilter] = useState<string>("all");
  const [hasLinkedDevicesFilter, setHasLinkedDevicesFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<Cartridge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [vendors, setVendors] = useState<string[]>([]);
  const [linkedPrintersMap, setLinkedPrintersMap] = useState<Map<string, Printer[]>>(new Map());
  const [isLoadingLinkedDevices, setIsLoadingLinkedDevices] = useState<boolean>(false);

  useEffect(() => {
    // Загружаем всех производителей из базы (все производители, не только текущей страницы)
    loadVendors();
  }, []);

  useEffect(() => {
    // Загружаем данные при изменении страницы или фильтров
    dispatch(fetchCartridges({ page: currentPage, limit: 30, vendor: vendorFilter || undefined }));
  }, [dispatch, currentPage, vendorFilter]);

  useEffect(() => {
    // Загружаем связанные принтеры для всех картриджей текущей страницы
    if (items.length > 0) {
      loadLinkedPrintersForAll();
    } else {
      setLinkedPrintersMap(new Map());
    }
  }, [items]);

  const loadVendors = async () => {
    try {
      const response = await getCartridgeVendors();
      if (response && response.data) {
        setVendors(response.data);
      }
    } catch (error) {
      console.error("Ошибка загрузки производителей:", error);
    }
  };

  const loadLinkedPrintersForAll = async () => {
    setIsLoadingLinkedDevices(true);
    const map = new Map<string, Printer[]>();
    try {
      await Promise.all(
        items.map(async (cartridge) => {
          try {
            const response = await getPrintersByCartridgeId(cartridge._id);
            map.set(cartridge._id, response.data || []);
          } catch (error) {
            map.set(cartridge._id, []);
          }
        })
      );
      setLinkedPrintersMap(map);
    } catch (error) {
      console.error("Ошибка загрузки связанных принтеров:", error);
    } finally {
      setIsLoadingLinkedDevices(false);
    }
  };

  // Проверяем наличие изображения
  const hasImage = (cartridge: Cartridge): boolean => {
    if (!cartridge.photo) return false;
    if (typeof cartridge.photo === 'object' && cartridge.photo !== null) {
      return !!(cartridge.photo.src || cartridge.photo._id);
    }
    return !!cartridge.photo;
  };

  // Фильтруем данные (только фильтры, которые нельзя сделать на сервере)
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Фильтр по картинке
      if (hasImageFilter === "yes" && !hasImage(item)) return false;
      if (hasImageFilter === "no" && hasImage(item)) return false;
      
      // Фильтр по связанным устройствам (применяем только если данные загружены для этого элемента)
      if (hasLinkedDevicesFilter !== "all") {
        const linkedPrinters = linkedPrintersMap.get(item._id);
        // Если данных еще нет для этого элемента, пропускаем фильтрацию (включаем элемент)
        if (linkedPrinters === undefined) {
          return true;
        }
        // Применяем фильтр только когда данные загружены
        if (hasLinkedDevicesFilter === "yes" && linkedPrinters.length === 0) return false;
        if (hasLinkedDevicesFilter === "no" && linkedPrinters.length > 0) return false;
      }
      
      return true;
    });
  }, [items, hasImageFilter, hasLinkedDevicesFilter, linkedPrintersMap]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className={styles.title}>Картриджи</h1>
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
          <label>Наличие связанных устройств:</label>
          <select
            value={hasLinkedDevicesFilter}
            onChange={(e) => setHasLinkedDevicesFilter(e.target.value)}
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
              <th>Устройства</th>
              <th>Цена заправки</th>
              <th>Цена восстановления</th>
              <th>Ресурс</th>
              <th>Чип</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((cartridge) => (
              <tr
                key={cartridge._id}
                onClick={() => {
                  setSelectedItem(cartridge);
                  setIsModalOpen(true);
                }}
                className={styles.tableRow}
              >
                <td>
                  {hasImage(cartridge) ? (
                    <span className={styles.statusIcon} style={{ color: "green" }}>✓</span>
                  ) : (
                    <span className={styles.statusIcon} style={{ color: "red" }}>✗</span>
                  )}
                </td>
                <td>{cartridge.modelCart}</td>
                <td>{cartridge.vendor}</td>
                <td>
                  {(() => {
                    const linkedPrinters = linkedPrintersMap.get(cartridge._id) || [];
                    if (linkedPrinters.length > 0) {
                      return linkedPrinters.map(p => `${p.vendor} ${p.model}`).join(", ");
                    }
                    return "Нет привязанных устройств";
                  })()}
                </td>
                <td>{cartridge.refill_price} ₽</td>
                <td>{cartridge.recovery_price} ₽</td>
                <td>{cartridge.resource || "-"}</td>
                <td>{cartridge.chip ? "Да" : "Нет"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredItems.length === 0 && (
        <div className={styles.empty}>Картриджи не найдены</div>
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
        <EditCartridgeModal
          cartridge={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={() => {
            dispatch(fetchCartridges({ page: currentPage, limit: 30, vendor: vendorFilter || undefined })).then(() => {
              loadLinkedPrintersForAll();
            });
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {isCreateModalOpen && (
        <CreateCartridgeModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={() => {
            dispatch(fetchCartridges({ page: currentPage, limit: 30, vendor: vendorFilter || undefined })).then(() => {
              loadLinkedPrintersForAll();
            });
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Компонент модального окна для редактирования картриджа
const EditCartridgeModal: React.FC<{
  cartridge: Cartridge;
  onClose: () => void;
  onSave: () => void;
}> = ({ cartridge, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    modelCart: cartridge.modelCart || "",
    vendor: cartridge.vendor || "",
    devices: cartridge.devices || "",
    refill_price: cartridge.refill_price || "",
    recovery_price: cartridge.recovery_price || "",
    resource: cartridge.resource || "",
    chip: Boolean(cartridge.chip) || false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  
  // Состояние для привязки принтеров
  const [allPrinters, setAllPrinters] = useState<Printer[]>([]);
  const [selectedPrinters, setSelectedPrinters] = useState<Printer[]>([]);
  const [linkedPrinters, setLinkedPrinters] = useState<Printer[]>([]);
  const [compatibilityMap, setCompatibilityMap] = useState<Map<string, string>>(new Map()); // printerId -> compatibilityId
  const [isLoadingPrinters, setIsLoadingPrinters] = useState(false);

  useEffect(() => {
    // Загружаем текущее изображение если есть
    if (cartridge.photo) {
      if (typeof cartridge.photo === 'object' && cartridge.photo !== null && cartridge.photo.src) {
        setCurrentImageSrc(cartridge.photo.src);
      }
    }
    
    // Загружаем все принтеры и связанные принтеры
    loadPrinters();
    loadLinkedPrinters();
  }, [cartridge._id]);

  const loadPrinters = async () => {
    try {
      setIsLoadingPrinters(true);
      const response = await getPaginatedPrinters({ page: 1, limit: 10000 });
      setAllPrinters(response.data);
    } catch (error) {
      console.error("Ошибка загрузки принтеров:", error);
    } finally {
      setIsLoadingPrinters(false);
    }
  };

  const loadLinkedPrinters = async () => {
    try {
      const response = await getPrintersByCartridgeId(cartridge._id);
      setLinkedPrinters(response.data);
      
      // Загружаем ID связей для каждого принтера
      const compatibilities = await getPaginatedCompatibilities({ cartridgeId: cartridge._id, limit: 1000 });
      const map = new Map<string, string>();
      compatibilities.data.forEach((comp) => {
        map.set(comp.printerId, comp._id);
      });
      setCompatibilityMap(map);
    } catch (error) {
      console.error("Ошибка загрузки связанных принтеров:", error);
    }
  };

  const handlePrinterSelect = (printer: Printer) => {
    if (!selectedPrinters.find((p) => p._id === printer._id)) {
      setSelectedPrinters([...selectedPrinters, printer]);
    }
  };

  const handleCreateCompatibility = async () => {
    if (selectedPrinters.length === 0) return;
    
    try {
      for (const printer of selectedPrinters) {
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
      setSelectedPrinters([]);
      await loadLinkedPrinters();
    } catch (error) {
      console.error("Ошибка при создании связей:", error);
      alert("Ошибка при создании связей");
    }
  };

  const handleDeleteCompatibility = async (printerId: string) => {
    const compatibilityId = compatibilityMap.get(printerId);
    if (!compatibilityId) return;
    
    try {
      await deleteCompatibility(compatibilityId);
      await loadLinkedPrinters();
    } catch (error) {
      console.error("Ошибка при удалении связи:", error);
      alert("Ошибка при удалении связи");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Обновляем данные картриджа
      await updateCartridge(
        cartridge._id,
        {
          ...formData,
          resource: formData.resource ? parseFloat(formData.resource as any) : undefined,
        },
        imageFile || undefined
      );

      // Если есть новое изображение и есть старое фото, обновляем его
      if (imageFile && cartridge.photo && typeof cartridge.photo === 'object' && cartridge.photo._id) {
        await updateImage(cartridge.photo._id, imageFile, { cartridgeId: cartridge._id });
      } else if (imageFile && (!cartridge.photo || (typeof cartridge.photo === 'object' && !cartridge.photo._id))) {
        // Если фото нет, загружаем новое
        await uploadImage(imageFile, { cartridgeId: cartridge._id });
      }

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
          <h2>Редактировать картридж</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Модель *</label>
            <input
              type="text"
              value={formData.modelCart}
              onChange={(e) => setFormData({ ...formData, modelCart: e.target.value })}
              required
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
            <label>Устройства</label>
            <input
              type="text"
              value={formData.devices}
              onChange={(e) => setFormData({ ...formData, devices: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Цена заправки</label>
            <input
              type="text"
              value={formData.refill_price}
              onChange={(e) => setFormData({ ...formData, refill_price: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Цена восстановления</label>
            <input
              type="text"
              value={formData.recovery_price}
              onChange={(e) => setFormData({ ...formData, recovery_price: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Ресурс</label>
            <input
              type="number"
              value={formData.resource}
              onChange={(e) => setFormData({ ...formData, resource: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                checked={formData.chip || false}
                onChange={(e) => setFormData({ ...formData, chip: e.target.checked })}
              />
              С чипом
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>Изображение</label>
            {currentImageSrc && (
              <img src={currentImageSrc} alt="Preview" className={styles.imagePreview} />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Привязать принтеры</label>
            {isLoadingPrinters ? (
              <div>Загрузка принтеров...</div>
            ) : (
              <>
                <DeviceSearch
                  items={allPrinters}
                  onSelect={handlePrinterSelect}
                  placeholder="Поиск принтера по модели или производителю..."
                  displayField="model"
                  searchFields={["model", "vendor"]}
                />
                {selectedPrinters.length > 0 && (
                  <button
                    type="button"
                    onClick={handleCreateCompatibility}
                    className={styles.linkButton}
                  >
                    Привязать выбранные принтеры ({selectedPrinters.length})
                  </button>
                )}
                {linkedPrinters.length > 0 && (
                  <div className={styles.linkedItems}>
                    <label>Связанные принтеры:</label>
                    {linkedPrinters.map((printer: Printer) => (
                      <div key={printer._id} className={styles.linkedItem}>
                        <span>{printer.vendor} {printer.model}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteCompatibility(printer._id)}
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

// Компонент модального окна для создания картриджа
const CreateCartridgeModal: React.FC<{
  onClose: () => void;
  onSave: () => void;
}> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    modelCart: "",
    vendor: "",
    devices: "",
    refill_price: "",
    recovery_price: "",
    resource: "",
    chip: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Состояние для привязки принтеров
  const [allPrinters, setAllPrinters] = useState<Printer[]>([]);
  const [selectedPrinters, setSelectedPrinters] = useState<Printer[]>([]);
  const [isLoadingPrinters, setIsLoadingPrinters] = useState(false);

  useEffect(() => {
    loadPrinters();
  }, []);

  const loadPrinters = async () => {
    try {
      setIsLoadingPrinters(true);
      const response = await getPaginatedPrinters({ page: 1, limit: 10000 });
      setAllPrinters(response.data);
    } catch (error) {
      console.error("Ошибка загрузки принтеров:", error);
    } finally {
      setIsLoadingPrinters(false);
    }
  };

  const handlePrinterSelect = (printer: Printer) => {
    if (!selectedPrinters.find((p) => p._id === printer._id)) {
      setSelectedPrinters([...selectedPrinters, printer]);
    }
  };

  const handleRemovePrinter = (printerId: string) => {
    setSelectedPrinters(selectedPrinters.filter((p) => p._id !== printerId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Создаем картридж
      const cartridgeData = {
        modelCart: formData.modelCart.trim(),
        vendor: formData.vendor.trim(),
        devices: formData.devices.trim(),
        refill_price: formData.refill_price,
        recovery_price: formData.recovery_price,
        resource: formData.resource ? parseFloat(formData.resource) : undefined,
        chip: formData.chip,
      };

      const createdCartridge = await createCartridge(cartridgeData);
      const cartridgeId = createdCartridge.data._id;

      // Загружаем изображение если есть
      if (imageFile) {
        try {
          await uploadImage(imageFile, { cartridgeId });
        } catch (error) {
          console.error("Ошибка загрузки изображения:", error);
        }
      }

      // Создаем связи с принтерами
      if (selectedPrinters.length > 0) {
        for (const printer of selectedPrinters) {
          try {
            await createCompatibility({
              cartridgeId,
              printerId: printer._id,
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
      console.error("Ошибка создания картриджа:", error);
      alert(error.response?.data?.error || "Ошибка создания картриджа");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Добавить картридж</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Модель *</label>
            <input
              type="text"
              value={formData.modelCart}
              onChange={(e) => setFormData({ ...formData, modelCart: e.target.value })}
              required
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
            <label>Устройства</label>
            <input
              type="text"
              value={formData.devices}
              onChange={(e) => setFormData({ ...formData, devices: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Цена заправки *</label>
            <input
              type="text"
              value={formData.refill_price}
              onChange={(e) => setFormData({ ...formData, refill_price: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Цена восстановления *</label>
            <input
              type="text"
              value={formData.recovery_price}
              onChange={(e) => setFormData({ ...formData, recovery_price: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Ресурс</label>
            <input
              type="text"
              value={formData.resource}
              onChange={(e) => setFormData({ ...formData, resource: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                checked={formData.chip}
                onChange={(e) => setFormData({ ...formData, chip: e.target.checked })}
              />
              Чип
            </label>
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
            <label>Привязать принтеры</label>
            {isLoadingPrinters ? (
              <div>Загрузка принтеров...</div>
            ) : (
              <>
                <DeviceSearch
                  items={allPrinters}
                  onSelect={handlePrinterSelect}
                  placeholder="Поиск принтера..."
                  displayField="model"
                  searchFields={["model", "vendor"]}
                />
                {selectedPrinters.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    {selectedPrinters.map((printer) => (
                      <div key={printer._id} className={styles.linkedItem}>
                        <span>{printer.vendor} {printer.model}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePrinter(printer._id)}
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
