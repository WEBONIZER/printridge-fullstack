import React, { useState, useEffect } from "react";
import { Printer, createCartridge, uploadImage, getPaginatedPrinters, createCompatibility } from "../../utils/api";
import { CartridgeFormFields } from "./CartridgeFormFields";
import { PrinterLinkingSection } from "./PrinterLinkingSection";
import styles from "./cartridges.module.css";

interface CreateCartridgeModalProps {
  onClose: () => void;
  onSave: () => void;
}

export const CreateCartridgeModal: React.FC<CreateCartridgeModalProps> = ({ onClose, onSave }) => {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null);
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
          await uploadImage(imageFile, { cartridgeId });
        } catch (error) {
          console.error("Ошибка загрузки изображения:", error);
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
    <div className={styles.modalOverlay} onClick={onClose}>
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
  );
};

