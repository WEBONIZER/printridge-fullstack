import React from "react";
import { Laptop } from "../../utils/api";
import styles from "./laptops.module.css";

interface LaptopsTableProps {
  laptops: Laptop[];
  onLaptopClick: (laptop: Laptop) => void;
}

export const LaptopsTable: React.FC<LaptopsTableProps> = ({
  laptops,
  onLaptopClick,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Модель</th>
            <th>Серия</th>
            <th>Производитель</th>
            <th>Диагональ</th>
            <th>Процессор</th>
            <th>Видеокарта</th>
            <th>ОЗУ</th>
            <th>Тип ОЗУ</th>
          </tr>
        </thead>
        <tbody>
          {laptops.map((laptop) => (
            <tr
              key={laptop._id}
              onClick={() => onLaptopClick(laptop)}
              className={styles.tableRow}
            >
              <td>{laptop.model}</td>
              <td>{laptop.series || "-"}</td>
              <td>{laptop.vendor}</td>
              <td>{laptop.display ? `${laptop.display}"` : "-"}</td>
              <td>{laptop.processorName || "-"}</td>
              <td>{laptop.video || "-"}</td>
              <td>{laptop.ram ? `${laptop.ram} GB` : "-"}</td>
              <td>{laptop.ramType || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

