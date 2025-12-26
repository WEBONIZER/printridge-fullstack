import React from "react";
import { Example, Cartridge, Printer, Laptop } from "../../utils/api";
import styles from "./examples.module.css";

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
  const getCartridgeModel = (cartridgeId: string | undefined): string => {
    if (!cartridgeId) return "-";
    const cartridge = cartridgesMap.get(cartridgeId);
    return cartridge ? cartridge.modelCart : "-";
  };

  const getPrinterModel = (printerId: string | undefined): string => {
    if (!printerId) return "-";
    const printer = printersMap.get(printerId);
    return printer ? printer.model : "-";
  };

  const getLaptopModel = (laptopId: string | undefined): string => {
    if (!laptopId) return "-";
    const laptop = laptopsMap.get(laptopId);
    return laptop ? laptop.model : "-";
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
                <div dangerouslySetInnerHTML={{ __html: example.text.substring(0, 100) + (example.text.length > 100 ? "..." : "") }} />
              </td>
              <td>{getCartridgeModel(example.cartridgeId)}</td>
              <td>{getPrinterModel(example.printerId)}</td>
              <td>{getLaptopModel(example.laptopId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

