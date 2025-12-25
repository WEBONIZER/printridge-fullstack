import React, { useState } from "react";
import { Laptop } from "../../utils/api";
import { LaptopFormFields } from "./LaptopFormFields";
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
          <LaptopFormFields
            formData={formData}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
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

