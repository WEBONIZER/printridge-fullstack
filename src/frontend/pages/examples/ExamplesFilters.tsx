import React from "react";
import styles from "./examples.module.css";

interface ExamplesFiltersProps {
  titleFilter: string;
  publicFilter: string;
  onTitleFilterChange: (value: string) => void;
  onPublicFilterChange: (value: string) => void;
}

export const ExamplesFilters: React.FC<ExamplesFiltersProps> = ({
  titleFilter,
  publicFilter,
  onTitleFilterChange,
  onPublicFilterChange,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label>Заголовок:</label>
        <input
          type="text"
          value={titleFilter}
          onChange={(e) => onTitleFilterChange(e.target.value)}
          placeholder="Введите заголовок..."
          className={styles.input}
        />
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

