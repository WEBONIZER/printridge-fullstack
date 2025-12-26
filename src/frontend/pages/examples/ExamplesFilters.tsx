import React from "react";
import styles from "./examples.module.css";

interface ExamplesFiltersProps {
  publicFilter: string;
  onPublicFilterChange: (value: string) => void;
}

export const ExamplesFilters: React.FC<ExamplesFiltersProps> = ({
  publicFilter,
  onPublicFilterChange,
}) => {
  return (
    <div className={styles.filters}>
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

