import React from "react";
import { Cartridge } from "../../utils/api";
import { DeviceSearch } from "../../components/device-search/device-search";
import styles from "./printers.module.css";

interface CartridgeLinkingSectionProps {
  allCartridges: Cartridge[];
  selectedCartridges: Cartridge[];
  linkedCartridges: Cartridge[];
  isLoadingCartridges: boolean;
  onCartridgeSelect: (cartridge: Cartridge) => void;
  onRemoveCartridge?: (cartridgeId: string) => void;
  onCreateCompatibility?: () => void;
  onDeleteCompatibility?: (cartridgeId: string) => void;
  isEditMode?: boolean;
}

export const CartridgeLinkingSection: React.FC<CartridgeLinkingSectionProps> = ({
  allCartridges,
  selectedCartridges,
  linkedCartridges,
  isLoadingCartridges,
  onCartridgeSelect,
  onRemoveCartridge,
  onCreateCompatibility,
  onDeleteCompatibility,
  isEditMode = false,
}) => {
  if (isLoadingCartridges) {
    return <div>Загрузка картриджей...</div>;
  }

  return (
    <>
      <DeviceSearch
        items={allCartridges}
        onSelect={onCartridgeSelect}
        placeholder={isEditMode ? "Поиск картриджа по модели или производителю..." : "Поиск картриджа..."}
        displayField="modelCart"
        searchFields={["modelCart", "vendor"]}
      />
      {selectedCartridges.length > 0 && onCreateCompatibility && (
        <button
          type="button"
          onClick={onCreateCompatibility}
          className={styles.linkButton}
        >
          Привязать выбранные картриджи ({selectedCartridges.length})
        </button>
      )}
      {selectedCartridges.length > 0 && onRemoveCartridge && (
        <div style={{ marginTop: "10px" }}>
          {selectedCartridges.map((cartridge) => (
            <div key={cartridge._id} className={styles.linkedItem}>
              <span>{cartridge.vendor} {cartridge.modelCart}</span>
              <button
                type="button"
                onClick={() => onRemoveCartridge(cartridge._id)}
                className={styles.deleteLinkButton}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
      {linkedCartridges.length > 0 && isEditMode && (
        <div className={styles.linkedItems}>
          <label>Связанные картриджи:</label>
          {linkedCartridges.map((cartridge: Cartridge) => (
            <div key={cartridge._id} className={styles.linkedItem}>
              <span>{cartridge.vendor} {cartridge.modelCart}</span>
              {onDeleteCompatibility && (
                <button
                  type="button"
                  onClick={() => onDeleteCompatibility(cartridge._id)}
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

