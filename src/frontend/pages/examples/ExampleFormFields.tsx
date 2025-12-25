import React from "react";
import styles from "./examples.module.css";

interface ExampleFormData {
  title: string;
  text: string;
  cartridgeId: string;
  printerId: string;
  laptopId: string;
}

interface ExampleFormFieldsProps {
  formData: ExampleFormData;
  onFormDataChange: (data: Partial<ExampleFormData>) => void;
  onVideoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ExampleFormFields: React.FC<ExampleFormFieldsProps> = ({
  formData,
  onFormDataChange,
  onVideoChange,
}) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label>Заголовок *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onFormDataChange({ title: e.target.value })}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Текст (HTML) *</label>
        <textarea
          value={formData.text}
          onChange={(e) => onFormDataChange({ text: e.target.value })}
          required
          rows={10}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Картридж ID</label>
        <input
          type="text"
          value={formData.cartridgeId}
          onChange={(e) => onFormDataChange({ cartridgeId: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Принтер ID</label>
        <input
          type="text"
          value={formData.printerId}
          onChange={(e) => onFormDataChange({ printerId: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Ноутбук ID</label>
        <input
          type="text"
          value={formData.laptopId}
          onChange={(e) => onFormDataChange({ laptopId: e.target.value })}
        />
      </div>
      {onVideoChange && (
        <div className={styles.formGroup}>
          <label>Видео</label>
          <input
            type="file"
            accept="video/*"
            onChange={onVideoChange}
          />
        </div>
      )}
    </>
  );
};

