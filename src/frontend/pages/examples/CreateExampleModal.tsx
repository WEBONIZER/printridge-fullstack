import React, { useState } from "react";
import { createExample, uploadVideo } from "../../utils/api";
import { ExampleFormFields } from "./ExampleFormFields";
import styles from "./examples.module.css";

interface CreateExampleModalProps {
  onClose: () => void;
  onSave: () => void;
}

export const CreateExampleModal: React.FC<CreateExampleModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    cartridgeId: "",
    printerId: "",
    laptopId: "",
    public: true,
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFile(e.target.files?.[0] || null);
  };

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
        public: formData.public,
      };

      const createdExample = await createExample(exampleData);
      const exampleId = createdExample.data._id;

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
          <ExampleFormFields
            formData={formData}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
            onVideoChange={handleVideoChange}
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

