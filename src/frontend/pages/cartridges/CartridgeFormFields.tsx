import React from "react";
import styles from "./cartridges.module.css";

interface CartridgeFormData {
  modelCart: string;
  vendor: string;
  devices: string;
  refill_price: string;
  recovery_price: string;
  resource: string;
  chip: boolean;
}

interface CartridgeFormFieldsProps {
  formData: CartridgeFormData;
  onFormDataChange: (data: Partial<CartridgeFormData>) => void;
  imagePreview?: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCreateMode?: boolean;
}

export const CartridgeFormFields: React.FC<CartridgeFormFieldsProps> = ({
  formData,
  onFormDataChange,
  imagePreview,
  onImageChange,
  isCreateMode = false,
}) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label>Модель *</label>
        <input
          type="text"
          value={formData.modelCart}
          onChange={(e) => onFormDataChange({ modelCart: e.target.value })}
          required
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
        <label>Изображение</label>
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
        )}
        <input type="file" accept="image/*" onChange={onImageChange} />
      </div>
    </>
  );
};

