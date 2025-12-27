import React from "react";
import { ModelAutocomplete } from "../../components/ModelAutocomplete";
import styles from "./cartridges.module.css";

interface CartridgeFormData {
  modelCart: string;
  vendor: string;
  devices: string;
  refill_price: string;
  recovery_price: string;
  resource: string;
  chip: boolean;
  public?: boolean;
}

interface CartridgeFormFieldsProps {
  formData: CartridgeFormData;
  onFormDataChange: (data: Partial<CartridgeFormData>) => void;
  imagePreview?: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCreateMode?: boolean;
  onSearchModels?: (query: string) => Promise<string[]>;
  onSearchVendors?: (query: string) => Promise<string[]>;
}

export const CartridgeFormFields: React.FC<CartridgeFormFieldsProps> = ({
  formData,
  onFormDataChange,
  imagePreview,
  onImageChange,
  isCreateMode = false,
  onSearchModels,
  onSearchVendors,
}) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label>Модель *</label>
        {isCreateMode && onSearchModels ? (
          <ModelAutocomplete
            value={formData.modelCart}
            onChange={(value) => onFormDataChange({ modelCart: value })}
            onSearch={onSearchModels}
            placeholder="Введите модель"
            required
          />
        ) : (
          <input
            type="text"
            value={formData.modelCart}
            onChange={(e) => onFormDataChange({ modelCart: e.target.value })}
            required
          />
        )}
      </div>
      <div className={styles.formGroup}>
        <label>Производитель *</label>
        {onSearchVendors ? (
          <ModelAutocomplete
            value={formData.vendor}
            onChange={(value) => onFormDataChange({ vendor: value })}
            onSearch={onSearchVendors}
            placeholder="Введите производителя"
            required
          />
        ) : (
          <input
            type="text"
            value={formData.vendor}
            onChange={(e) => onFormDataChange({ vendor: e.target.value })}
            required
          />
        )}
      </div>
      <div className={styles.formGroup}>
        <label>Устройства</label>
        <input
          type="text"
          value={formData.devices}
          onChange={(e) => onFormDataChange({ devices: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Цена заправки {isCreateMode && "*"}</label>
        <input
          type="text"
          value={formData.refill_price}
          onChange={(e) => onFormDataChange({ refill_price: e.target.value })}
          required={isCreateMode}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Цена восстановления {isCreateMode && "*"}</label>
        <input
          type="text"
          value={formData.recovery_price}
          onChange={(e) => onFormDataChange({ recovery_price: e.target.value })}
          required={isCreateMode}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Ресурс</label>
        <input
          type={isCreateMode ? "text" : "number"}
          value={formData.resource}
          onChange={(e) => onFormDataChange({ resource: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label>
          <input
            type="checkbox"
            checked={formData.chip || false}
            onChange={(e) => onFormDataChange({ chip: e.target.checked })}
          />
          {isCreateMode ? "Чип" : "С чипом"}
        </label>
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
      <div className={styles.formGroup}>
        <label>Изображение</label>
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
        )}
        <input type="file" accept="image/*" onChange={onImageChange} />
      </div>
    </>
  );
};

