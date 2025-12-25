import React, { useState } from "react";
import { Example, updateExample } from "../../utils/api";
import { ExampleFormFields } from "./ExampleFormFields";
import styles from "./examples.module.css";

interface EditExampleModalProps {
  example: Example;
  onClose: () => void;
  onSave: () => void;
}

export const EditExampleModal: React.FC<EditExampleModalProps> = ({ example, onClose, onSave }) => {
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
          <ExampleFormFields
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

