import React, { useState, useEffect } from "react";
import { Laptop, uploadImage, updateImage } from "../../utils/api";
import { LaptopFormFields } from "./LaptopFormFields";
import { LaptopPriceSection } from "./LaptopPriceSection";
import styles from "./laptops.module.css";

interface EditLaptopModalProps {
  laptop: Laptop;
  onClose: () => void;
  onSave: () => void;
}

export const EditLaptopModal: React.FC<EditLaptopModalProps> = ({ laptop, onClose, onSave }) => {
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
    public: laptop.public !== false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>((laptop as any).price || null);

  useEffect(() => {
    if ((laptop as any).photo) {
      const photo = (laptop as any).photo;
      if (typeof photo === 'object' && photo !== null && photo.src) {
        setCurrentImageSrc(photo.src);
      }
    }
  }, [laptop._id]);

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
      const { updateLaptop } = await import("../../utils/api");
      await updateLaptop(laptop._id, {
        ...formData,
        display: formData.display ? parseFloat(formData.display as any) : undefined,
        processor: formData.processor ? parseFloat(formData.processor as any) : undefined,
        ram: formData.ram ? parseFloat(formData.ram as any) : undefined,
        public: formData.public,
        price: selectedPriceId || undefined,
      });

      if (imageFile) {
        const photo = (laptop as any).photo;
        if (photo && typeof photo === 'object' && photo._id) {
          await updateImage(photo._id, imageFile, { laptopId: laptop._id });
        } else {
          await uploadImage(imageFile, { laptopId: laptop._id });
        }
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
          <h2>Редактировать ноутбук</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <LaptopFormFields
            formData={formData}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
            imagePreview={currentImageSrc}
            onImageChange={handleImageChange}
          />

          <LaptopPriceSection
            currentPriceId={(laptop as any).price}
            display={formData.display ? parseFloat(formData.display as any) : undefined}
            onPriceChange={setSelectedPriceId}
          />

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

