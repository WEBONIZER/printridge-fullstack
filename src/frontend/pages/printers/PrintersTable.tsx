import React from "react";
import { Printer, Cartridge } from "../../utils/api";
import styles from "./printers.module.css";

interface PrintersTableProps {
  printers: Printer[];
  linkedCartridgesMap: Map<string, Cartridge[]>;
  onPrinterClick: (printer: Printer) => void;
}

export const PrintersTable: React.FC<PrintersTableProps> = ({
  printers,
  linkedCartridgesMap,
  onPrinterClick,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Картинка</th>
            <th>Модель</th>
            <th>Производитель</th>
            <th>Устройство</th>
            <th>Тип</th>
            <th>Формат</th>
            <th>Привязанные картриджи</th>
            <th>Ресурс</th>
            <th>Скорость</th>
          </tr>
        </thead>
        <tbody>
          {printers.map((printer) => (
            <tr
              key={printer._id}
              onClick={() => onPrinterClick(printer)}
              className={styles.tableRow}
            >
              <td>
                {(() => {
                  const photoSrc = printer.photo && typeof printer.photo === 'object' && printer.photo.src
                    ? printer.photo.src
                    : printer.vendor && printer.model
                      ? `https://storage.yandexcloud.net/printridge/repair/${printer.vendor}/${printer.model}.png`
                      : null;
                  
                  return photoSrc ? (
                    <img
                      key={`${printer._id}-${photoSrc}`}
                      src={photoSrc}
                      alt={printer.model}
                      className={styles.deviceImage}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className={styles.statusIcon} style={{ color: "#ccc" }}>-</span>
                  );
                })()}
              </td>
              <td>{printer.model}</td>
              <td>{printer.vendor}</td>
              <td>{printer.device || "-"}</td>
              <td>{printer.type || "-"}</td>
              <td>{printer.format || "-"}</td>
              <td>
                {(() => {
                  const linkedCartridges = linkedCartridgesMap.get(printer._id) || [];
                  if (linkedCartridges.length > 0) {
                    return linkedCartridges.map(c => `${c.vendor} ${c.modelCart}`).join(", ");
                  }
                  return "Нет привязанных картриджей";
                })()}
              </td>
              <td>{printer.capacity ? `${printer.capacity} стр.` : "-"}</td>
              <td>{printer.speed ? `${printer.speed} стр/мин` : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

