import React, { useState, useEffect } from "react";
import { Printer, createCartridge, uploadImage, updateCartridge, getPaginatedPrinters, createCompatibility, searchCartridgeModels, getCartridgeVendors } from "../../utils/api";
import { CartridgeFormFields } from "./CartridgeFormFields";
import { PrinterLinkingSection } from "./PrinterLinkingSection";
import { CreatePrinterModal } from "../printers/CreatePrinterModal";
import styles from "./cartridges.module.css";

interface CreateCartridgeModalProps {
  onClose: () => void;
  onSave: () => void;
  isNested?: boolean;
}

export const CreateCartridgeModal: React.FC<CreateCartridgeModalProps> = ({ onClose, onSave, isNested = false }) => {
  const [formData, setFormData] = useState({
    modelCart: "",
    vendor: "",
    devices: "",
    refill_price: "",
    recovery_price: "",
    resource: "",
    chip: false,
    public: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [allPrinters, setAllPrinters] = useState<Printer[]>([]);
  const [selectedPrinters, setSelectedPrinters] = useState<Printer[]>([]);
  const [isLoadingPrinters, setIsLoadingPrinters] = useState(false);
  const [isCreatePrinterModalOpen, setIsCreatePrinterModalOpen] = useState(false);
  const [allVendors, setAllVendors] = useState<string[]>([]);

  useEffect(() => {
    loadPrinters();
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const response = await getCartridgeVendors();
      if (response && response.data && Array.isArray(response.data)) {
        setAllVendors(response.data);
      } else {
        setAllVendors([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки производителей:", error);
      setAllVendors([]);
    }
  };

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

  const handleCreateNewPrinter = () => {
    setIsCreatePrinterModalOpen(true);
  };

  const handlePrinterCreated = async () => {
    await loadPrinters();
    setIsCreatePrinterModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const handleSearchModels = async (query: string): Promise<string[]> => {
    try {
      const response = await searchCartridgeModels(query);
      return response.data || [];
    } catch (error) {
      console.error("Ошибка поиска моделей:", error);
      return [];
    }
  };

  const handleSearchVendors = async (query: string): Promise<string[]> => {
    if (allVendors.length === 0) {
      return [];
    }
    const queryLower = query.toLowerCase().trim();
    if (!queryLower) {
      return allVendors.slice(0, 20);
    }
    const filtered = allVendors
      .filter(vendor => vendor && typeof vendor === 'string' && vendor.toLowerCase().includes(queryLower))
      .slice(0, 20);
    return filtered;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const cartridgeData = {
        modelCart: formData.modelCart.trim(),
        vendor: formData.vendor.trim(),
        devices: formData.devices.trim(),
        refill_price: formData.refill_price,
        recovery_price: formData.recovery_price,
        resource: formData.resource ? parseFloat(formData.resource) : undefined,
        chip: formData.chip,
        public: formData.public,
      };

      const createdCartridge = await createCartridge(cartridgeData);
      const cartridgeId = createdCartridge.data._id;

      if (imageFile) {
        try {
          const uploadResult = await uploadImage(imageFile, { cartridgeId });
          // Обновляем картридж, чтобы установить ссылку на загруженное фото
          if (uploadResult.data && (uploadResult.data as any).id) {
            const photoId = (uploadResult.data as any).id;
            // Обновляем картридж с ID фото
            await updateCartridge(cartridgeId, { photo: photoId } as any, undefined);
          }
        } catch (error: any) {
          console.error("Ошибка загрузки изображения:", error);
          alert(error.response?.data?.error || "Ошибка загрузки изображения");
        }
      }

      if (selectedPrinters.length > 0) {
        for (const printer of selectedPrinters) {
          try {
            await createCompatibility({
              cartridgeId,
              printerId: printer._id,
            });
          } catch (error: any) {
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
    <>
      {isCreatePrinterModalOpen && (
        <CreatePrinterModal
          onClose={() => setIsCreatePrinterModalOpen(false)}
          onSave={handlePrinterCreated}
          isNested={true}
        />
      )}
      <div className={`${styles.modalOverlay} ${isNested ? styles.modalOverlayNested : ''}`} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>Добавить картридж</h2>
            <button onClick={onClose} className={styles.closeButton}>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <CartridgeFormFields
              formData={formData}
              onFormDataChange={(data) => setFormData({ ...formData, ...data })}
              onImageChange={handleImageChange}
              isCreateMode={true}
              onSearchModels={handleSearchModels}
              onSearchVendors={handleSearchVendors}
            />

            <div className={styles.linkedItems}>
              <label>Привязать принтеры</label>
              <PrinterLinkingSection
                allPrinters={allPrinters}
                selectedPrinters={selectedPrinters}
                linkedPrinters={[]}
                isLoadingPrinters={isLoadingPrinters}
                onPrinterSelect={handlePrinterSelect}
                onRemovePrinter={handleRemovePrinter}
                onCreateNewPrinter={handleCreateNewPrinter}
                isEditMode={false}
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
    </>
  );
};

