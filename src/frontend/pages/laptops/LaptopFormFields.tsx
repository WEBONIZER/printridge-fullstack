import React from "react";
import styles from "./laptops.module.css";

interface LaptopFormData {
  model: string;
  series: string;
  vendor: string;
  display: string;
  processor: string;
  processorVendor: string;
  processorName: string;
  video: string;
  ram: string;
  ramType: string;
}

interface LaptopFormFieldsProps {
  formData: LaptopFormData;
  onFormDataChange: (data: Partial<LaptopFormData>) => void;
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LaptopFormFields: React.FC<LaptopFormFieldsProps> = ({
  formData,
  onFormDataChange,
  onImageChange,
}) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label>Модель *</label>
        <input
          type="text"
          value={formData.model}
          onChange={(e) => onFormDataChange({ model: e.target.value })}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Серия</label>
        <input
          type="text"
          value={formData.series}
          onChange={(e) => onFormDataChange({ series: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Производитель *</label>
        <input
          type="text"
          value={formData.vendor}
          onChange={(e) => onFormDataChange({ vendor: e.target.value })}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Диагональ {formData.display && !onImageChange ? "(дюймы)" : ""}</label>
        <input
          type={formData.display && !onImageChange ? "number" : "number"}
          step={formData.display && !onImageChange ? "0.1" : undefined}
          value={formData.display}
          onChange={(e) => onFormDataChange({ display: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Частота процессора {formData.processor && !onImageChange ? "(ГГц)" : ""}</label>
        <input
          type={formData.processor && !onImageChange ? "number" : "number"}
          step={formData.processor && !onImageChange ? "0.1" : undefined}
          value={formData.processor}
          onChange={(e) => onFormDataChange({ processor: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Производитель процессора</label>
        <input
          type="text"
          value={formData.processorVendor}
          onChange={(e) => onFormDataChange({ processorVendor: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Название процессора</label>
        <input
          type="text"
          value={formData.processorName}
          onChange={(e) => onFormDataChange({ processorName: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Видеокарта</label>
        <input
          type="text"
          value={formData.video}
          onChange={(e) => onFormDataChange({ video: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>ОЗУ (GB)</label>
        <input
          type="number"
          value={formData.ram}
          onChange={(e) => onFormDataChange({ ram: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Тип ОЗУ</label>
        <input
          type="text"
          value={formData.ramType}
          onChange={(e) => onFormDataChange({ ramType: e.target.value })}
        />
      </div>
      {onImageChange && (
        <div className={styles.formGroup}>
          <label>Изображение</label>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
          />
        </div>
      )}
    </>
  );
};

