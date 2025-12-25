import React from "react";
import styles from "./laptops.module.css";

interface LaptopsFiltersProps {
  vendorFilter: string;
  vendors: string[];
  onVendorFilterChange: (value: string) => void;
}

export const LaptopsFilters: React.FC<LaptopsFiltersProps> = ({
  vendorFilter,
  vendors,
  onVendorFilterChange,
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
    </div>
  );
};

