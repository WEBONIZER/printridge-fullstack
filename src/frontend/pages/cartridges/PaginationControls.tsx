import React from "react";
import styles from "./cartridges.module.css";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPreviousPage,
  onNextPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        Назад
      </button>
      <span className={styles.paginationInfo}>
        Страница {currentPage} из {totalPages} ({totalItems} всего)
      </span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
      >
        Вперёд
      </button>
    </div>
  );
};

