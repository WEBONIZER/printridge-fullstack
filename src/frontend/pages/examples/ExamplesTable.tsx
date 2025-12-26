import React from "react";
import { Example, Cartridge, Printer, Laptop } from "../../utils/api";
import styles from "./examples.module.css";
import { sanitizeHtml } from "../../utils/html-sanitizer";

interface ExamplesTableProps {
  examples: Example[];
  cartridgesMap: Map<string, Cartridge>;
  printersMap: Map<string, Printer>;
  laptopsMap: Map<string, Laptop>;
  onExampleClick: (example: Example) => void;
}

export const ExamplesTable: React.FC<ExamplesTableProps> = ({
  examples,
  cartridgesMap,
  printersMap,
  laptopsMap,
  onExampleClick,
}) => {
  const formatDeviceNames = (names: string[] | undefined): string => {
    if (!names || !Array.isArray(names) || names.length === 0) return "-";
    return names.filter(name => name && name.trim()).join(", ");
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Заголовок</th>
            <th>Текст</th>
            <th>Картридж</th>
            <th>Принтер</th>
            <th>Ноутбук</th>
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
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(example.text.substring(0, 100) + (example.text.length > 100 ? "..." : "")) }} />
              </td>
              <td title={formatDeviceNames(example.cartridgeNames)}>{formatDeviceNames(example.cartridgeNames)}</td>
              <td title={formatDeviceNames(example.printerNames)}>{formatDeviceNames(example.printerNames)}</td>
              <td title={formatDeviceNames(example.laptopNames)}>{formatDeviceNames(example.laptopNames)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

