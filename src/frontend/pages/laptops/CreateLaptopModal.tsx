import React, { useState } from "react";
import { createLaptop, uploadImage, searchLaptopModels } from "../../utils/api";
import { LaptopFormFields } from "./LaptopFormFields";
import { LaptopPriceSection } from "./LaptopPriceSection";
import styles from "./laptops.module.css";

interface CreateLaptopModalProps {
  onClose: () => void;
  onSave: () => void;
}

export const CreateLaptopModal: React.FC<CreateLaptopModalProps> = ({ onClose, onSave }) => {
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
    public: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const handleSearchModels = async (query: string): Promise<string[]> => {
    try {
      const response = await searchLaptopModels(query);
      return response.data || [];
    } catch (error) {
      console.error("Ошибка поиска моделей:", error);
      return [];
    }
  };

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
        public: formData.public,
        price: selectedPriceId || undefined,
      };

      const createdLaptop = await createLaptop(laptopData);
      const laptopId = createdLaptop.data._id;

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
          <LaptopFormFields
            formData={formData}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
            onImageChange={handleImageChange}
            isCreateMode={true}
            onSearchModels={handleSearchModels}
          />

          <LaptopPriceSection
            display={formData.display ? parseFloat(formData.display) : undefined}
            onPriceChange={setSelectedPriceId}
          />

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

