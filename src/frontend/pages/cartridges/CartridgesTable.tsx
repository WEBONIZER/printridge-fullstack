import React from "react";
import { Cartridge, Printer } from "../../utils/api";
import styles from "./cartridges.module.css";

interface CartridgesTableProps {
  cartridges: Cartridge[];
  linkedPrintersMap: Map<string, Printer[]>;
  onCartridgeClick: (cartridge: Cartridge) => void;
}

export const CartridgesTable: React.FC<CartridgesTableProps> = ({
  cartridges,
  linkedPrintersMap,
  onCartridgeClick,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Картинка</th>
            <th>Модель</th>
            <th>Производитель</th>
            <th>Устройства</th>
            <th>Цена заправки</th>
            <th>Цена восстановления</th>
            <th>Ресурс</th>
            <th>Чип</th>
          </tr>
        </thead>
        <tbody>
          {cartridges.map((cartridge) => (
            <tr
              key={cartridge._id}
              onClick={() => onCartridgeClick(cartridge)}
              className={styles.tableRow}
            >
              <td>
                {(() => {
                  const photoSrc = cartridge.photo && typeof cartridge.photo === 'object' && cartridge.photo.src
                    ? cartridge.photo.src
                    : cartridge.vendor && cartridge.modelCart
                      ? `https://storage.yandexcloud.net/printridge/refill/${cartridge.vendor}/${cartridge.modelCart}.png`
                      : null;
                  
                  return photoSrc ? (
                    <img
                      key={`${cartridge._id}-${photoSrc}`}
                      src={photoSrc}
                      alt={cartridge.modelCart}
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
              <td>{cartridge.modelCart}</td>
              <td>{cartridge.vendor}</td>
              <td>
                {(() => {
                  const linkedPrinters = linkedPrintersMap.get(cartridge._id) || [];
                  if (linkedPrinters.length > 0) {
                    return linkedPrinters.map(p => `${p.model}`).join(", ");
                  }
                  return "Нет привязанных устройств";
                })()}
              </td>
              <td>{cartridge.refill_price} ₽</td>
              <td>{cartridge.recovery_price} ₽</td>
              <td>{cartridge.resource || "-"}</td>
              <td>{cartridge.chip ? "Да" : "Нет"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

