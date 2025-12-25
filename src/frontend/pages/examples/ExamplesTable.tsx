import React from "react";
import { Example } from "../../utils/api";
import styles from "./examples.module.css";

interface ExamplesTableProps {
  examples: Example[];
  onExampleClick: (example: Example) => void;
}

export const ExamplesTable: React.FC<ExamplesTableProps> = ({
  examples,
  onExampleClick,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Заголовок</th>
            <th>Текст</th>
            <th>Картридж ID</th>
            <th>Принтер ID</th>
            <th>Ноутбук ID</th>
          </tr>
        </thead>
        <tbody>
          {examples.map((example) => (
            <tr
              key={example._id}
              onClick={() => onExampleClick(example)}
              className={styles.tableRow}
            >
              <td>{example.title}</td>
              <td className={styles.textCell}>
                <div dangerouslySetInnerHTML={{ __html: example.text.substring(0, 100) + (example.text.length > 100 ? "..." : "") }} />
              </td>
              <td>{example.cartridgeId || "-"}</td>
              <td>{example.printerId || "-"}</td>
              <td>{example.laptopId || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

