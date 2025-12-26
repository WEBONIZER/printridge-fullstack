import React from "react";
import styles from "./cartridges.module.css";

interface CartridgesFiltersProps {
  vendorFilter: string;
  hasImageFilter: string;
  hasLinkedDevicesFilter: string;
  publicFilter: string;
  vendors: string[];
  onVendorFilterChange: (value: string) => void;
  onHasImageFilterChange: (value: string) => void;
  onHasLinkedDevicesFilterChange: (value: string) => void;
  onPublicFilterChange: (value: string) => void;
}

export const CartridgesFilters: React.FC<CartridgesFiltersProps> = ({
  vendorFilter,
  hasImageFilter,
  hasLinkedDevicesFilter,
  publicFilter,
  vendors,
  onVendorFilterChange,
  onHasImageFilterChange,
  onHasLinkedDevicesFilterChange,
  onPublicFilterChange,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label>Производитель:</label>
        <select
          value={vendorFilter}
          onChange={(e) => onVendorFilterChange(e.target.value)}
          className={styles.select}
        >
          <option value="">Все</option>
          {vendors.map((vendor) => (
            <option key={vendor} value={vendor}>
              {vendor}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Наличие картинки:</label>
        <select
          value={hasImageFilter}
          onChange={(e) => onHasImageFilterChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">Все</option>
          <option value="yes">Есть</option>
          <option value="no">Нет</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Наличие связанных устройств:</label>
        <select
          value={hasLinkedDevicesFilter}
          onChange={(e) => onHasLinkedDevicesFilterChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">Все</option>
          <option value="yes">Есть</option>
          <option value="no">Нет</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Публичный статус:</label>
        <select
          value={publicFilter}
          onChange={(e) => onPublicFilterChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">Все</option>
          <option value="true">Публичные</option>
          <option value="false">Скрытые</option>
        </select>
      </div>
    </div>
  );
};

