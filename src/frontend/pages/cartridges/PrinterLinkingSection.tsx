import React from "react";
import { Printer } from "../../utils/api";
import { DeviceSearch } from "../../components/device-search/device-search";
import styles from "./cartridges.module.css";

interface PrinterLinkingSectionProps {
  allPrinters: Printer[];
  selectedPrinters: Printer[];
  linkedPrinters: Printer[];
  isLoadingPrinters: boolean;
  onPrinterSelect: (printer: Printer) => void;
  onRemovePrinter?: (printerId: string) => void;
  onCreateCompatibility?: () => void;
  onDeleteCompatibility?: (printerId: string) => void;
  onCreateNewPrinter?: () => void;
  isEditMode?: boolean;
}

export const PrinterLinkingSection: React.FC<PrinterLinkingSectionProps> = ({
  allPrinters,
  selectedPrinters,
  linkedPrinters,
  isLoadingPrinters,
  onPrinterSelect,
  onRemovePrinter,
  onCreateCompatibility,
  onDeleteCompatibility,
  onCreateNewPrinter,
  isEditMode = false,
}) => {
  if (isLoadingPrinters) {
    return <div>Загрузка принтеров...</div>;
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <div style={{ flex: 1 }}>
          <DeviceSearch
            items={allPrinters}
            onSelect={onPrinterSelect}
            placeholder={isEditMode ? "Поиск принтера по модели или производителю..." : "Поиск принтера..."}
            displayField="model"
            searchFields={["model", "vendor"]}
          />
        </div>
        {onCreateNewPrinter && (
          <button
            type="button"
            onClick={onCreateNewPrinter}
            className={styles.linkButton}
            style={{ whiteSpace: 'nowrap' }}
          >
            + Добавить принтер
          </button>
        )}
      </div>
      {selectedPrinters.length > 0 && onCreateCompatibility && (
        <button
          type="button"
          onClick={onCreateCompatibility}
          className={styles.linkButton}
        >
          Привязать выбранные принтеры ({selectedPrinters.length})
        </button>
      )}
      {selectedPrinters.length > 0 && onRemovePrinter && (
        <div style={{ marginTop: "10px" }}>
          {selectedPrinters.map((printer) => (
            <div key={printer._id} className={styles.linkedItem}>
              <span>{printer.vendor} {printer.model}</span>
              <button
                type="button"
                onClick={() => onRemovePrinter(printer._id)}
                className={styles.deleteLinkButton}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
      {linkedPrinters.length > 0 && isEditMode && (
        <div className={styles.linkedItems}>
          <label>Связанные принтеры:</label>
          {linkedPrinters.map((printer: Printer) => (
            <div key={printer._id} className={styles.linkedItem}>
              <span>{printer.vendor} {printer.model}</span>
              {onDeleteCompatibility && (
                <button
                  type="button"
                  onClick={() => onDeleteCompatibility(printer._id)}
                  className={styles.deleteLinkButton}
                >
                  Удалить связь
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

