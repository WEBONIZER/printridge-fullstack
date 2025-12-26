import React from "react";
import { ModelAutocomplete } from "../../components/ModelAutocomplete";
import styles from "./printers.module.css";

interface PrinterFormData {
  vendor: string;
  model: string;
  device: string;
  type: string;
  format: string;
  capacity: string;
  speed: string;
  public?: boolean;
}

interface PrinterFormFieldsProps {
  formData: PrinterFormData;
  onFormDataChange: (data: Partial<PrinterFormData>) => void;
  imagePreview?: string | null;
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCreateMode?: boolean;
  onSearchModels?: (query: string) => Promise<string[]>;
}

export const PrinterFormFields: React.FC<PrinterFormFieldsProps> = ({
  formData,
  onFormDataChange,
  imagePreview,
  onImageChange,
  isCreateMode = false,
  onSearchModels,
}) => {
  return (
    <>
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
        <label>Модель *</label>
        {isCreateMode && onSearchModels ? (
          <ModelAutocomplete
            value={formData.model}
            onChange={(value) => onFormDataChange({ model: value })}
            onSearch={onSearchModels}
            placeholder="Введите модель"
            required
          />
        ) : (
          <input
            type="text"
            value={formData.model}
            onChange={(e) => onFormDataChange({ model: e.target.value })}
            required
          />
        )}
      </div>
      <div className={styles.formGroup}>
        <label>Устройство</label>
        {isCreateMode ? (
          <input
            type="text"
            value={formData.device}
            onChange={(e) => onFormDataChange({ device: e.target.value })}
          />
        ) : (
          <select
            value={formData.device}
            onChange={(e) => onFormDataChange({ device: e.target.value })}
          >
            <option value="">Не указано</option>
            <option value="printer">Принтер</option>
            <option value="MFU">МФУ</option>
          </select>
        )}
      </div>
      <div className={styles.formGroup}>
        <label>Тип</label>
        {isCreateMode ? (
          <input
            type="text"
            value={formData.type}
            onChange={(e) => onFormDataChange({ type: e.target.value })}
          />
        ) : (
          <select
            value={formData.type}
            onChange={(e) => onFormDataChange({ type: e.target.value })}
          >
            <option value="">Не указано</option>
            <option value="mono">Монохромный</option>
            <option value="color">Цветной</option>
          </select>
        )}
      </div>
      <div className={styles.formGroup}>
        <label>Формат</label>
        <select
          value={formData.format}
          onChange={(e) => onFormDataChange({ format: e.target.value })}
        >
          <option value="">Не указано</option>
          <option value="A4">A4</option>
          <option value="A3">A3</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label>Ресурс (страниц)</label>
        <input
          type="number"
          value={formData.capacity}
          onChange={(e) => onFormDataChange({ capacity: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Скорость (стр/мин)</label>
        <input
          type="number"
          value={formData.speed}
          onChange={(e) => onFormDataChange({ speed: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>
          <input
            type="checkbox"
            checked={formData.public !== false}
            onChange={(e) => onFormDataChange({ public: e.target.checked })}
          />
          Публичный
        </label>
      </div>
      {onImageChange && (
        <div className={styles.formGroup}>
          <label>Изображение</label>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
          )}
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

