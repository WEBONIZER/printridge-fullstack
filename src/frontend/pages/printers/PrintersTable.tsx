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
                  // Проверяем наличие фото в разных форматах
                  let photoSrc: string | null = null;
                  
                  if (printer.photo) {
                    if (typeof printer.photo === 'object' && printer.photo !== null) {
                      // Если photo - объект, берем src
                      photoSrc = printer.photo.src || null;
                    } else if (typeof printer.photo === 'string') {
                      // Если photo - строка (URL)
                      photoSrc = printer.photo;
                    }
                  }
                  
                  // Если фото не найдено, используем fallback URL
                  if (!photoSrc && printer.vendor && printer.model) {
                    photoSrc = `https://storage.yandexcloud.net/printridge/repair/${printer.vendor}/${printer.model}.png`;
                  }
                  
                  return photoSrc ? (
                    <img
                      key={`${printer._id}-${photoSrc}`}
                      src={photoSrc}
                      alt={`${printer.vendor} ${printer.model}`}
                      className={styles.deviceImage}
                      onError={(e) => {
                        // При ошибке загрузки скрываем изображение
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

