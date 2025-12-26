import React, { useState, useEffect } from "react";
import { getAllPrinterPriceTemplates, updatePrinterPriceTemplate } from "../../utils/api";
import { IPrinterPriceTemplateSchema } from "../../../utils/types";
import styles from "./printers.module.css";

interface PrinterPriceTemplatesModalProps {
  onClose: () => void;
}

export const PrinterPriceTemplatesModal: React.FC<PrinterPriceTemplatesModalProps> = ({ onClose }) => {
  const [templates, setTemplates] = useState<IPrinterPriceTemplateSchema[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<IPrinterPriceTemplateSchema | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPrinterPriceTemplates();
      setTemplates(response.data);
    } catch (error) {
      console.error("Ошибка загрузки прайсов:", error);
      alert("Ошибка загрузки прайсов");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (template: IPrinterPriceTemplateSchema) => {
    setEditingTemplate({ ...template });
  };

  const handleSave = async () => {
    if (!editingTemplate || !editingTemplate._id) return;

    try {
      setIsSaving(true);
      await updatePrinterPriceTemplate(editingTemplate._id, editingTemplate);
      await loadTemplates();
      setEditingTemplate(null);
    } catch (error) {
      console.error("Ошибка сохранения прайса:", error);
      alert("Ошибка сохранения прайса");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTemplate(null);
  };

  const updateEditingField = (field: keyof IPrinterPriceTemplateSchema, value: number) => {
    if (!editingTemplate) return;
    setEditingTemplate({ ...editingTemplate, [field]: value });
  };

  const formatPriceValue = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "-";
    return value.toLocaleString("ru-RU");
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "900px" }}>
        <div className={styles.modalHeader}>
          <h2>Управление прайсами принтеров</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalForm} style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>Загрузка...</div>
          ) : (
            <div>
              {templates.map((template) => (
                <div
                  key={template._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginBottom: "15px",
                    padding: "15px",
                  }}
                >
                  {editingTemplate?._id === template._id ? (
                    <div>
                      <h3 style={{ marginTop: 0 }}>Редактирование: {template.priceType}</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        {[
                          { key: "diagnostics" as const, label: "Диагностика" },
                          { key: "TO" as const, label: "ТО" },
                          { key: "rollers" as const, label: "Ролики" },
                          { key: "drum" as const, label: "Барабан" },
                          { key: "laser" as const, label: "Лазер" },
                          { key: "therm" as const, label: "Термоблок" },
                          { key: "reducer" as const, label: "Редуктор" },
                          { key: "scaner" as const, label: "Сканер" },
                          { key: "adf" as const, label: "АДФ" },
                          { key: "duplex" as const, label: "Дуплекс" },
                          { key: "electronics" as const, label: "Электроника" },
                        ].map(({ key, label }) => (
                          <div key={key}>
                            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                              {label}:
                            </label>
                            <input
                              type="number"
                              value={editingTemplate[key] ?? ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateEditingField(key, val === "" ? 0 : parseFloat(val));
                              }}
                              style={{
                                width: "100%",
                                padding: "6px",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                        <button
                          type="button"
                          onClick={handleSave}
                          disabled={isSaving}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          {isSaving ? "Сохранение..." : "Сохранить"}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          disabled={isSaving}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ marginTop: 0 }}>{template.priceType}</h3>
                        <button
                          type="button"
                          onClick={() => handleEdit(template)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                        >
                          Редактировать
                        </button>
                      </div>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          marginTop: "10px",
                          fontSize: "14px",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500, width: "30%" }}>Диагностика:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.diagnostics)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>ТО:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.TO)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Ролики:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.rollers)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Барабан:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.drum)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Лазер:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.laser)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Термоблок:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.therm)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Редуктор:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.reducer)} ₽</td>
                          </tr>
                          {template.scaner !== null && template.scaner !== undefined && (
                            <tr>
                              <td style={{ padding: "5px", fontWeight: 500 }}>Сканер:</td>
                              <td style={{ padding: "5px" }}>{formatPriceValue(template.scaner)} ₽</td>
                            </tr>
                          )}
                          {template.adf !== null && template.adf !== undefined && (
                            <tr>
                              <td style={{ padding: "5px", fontWeight: 500 }}>АДФ:</td>
                              <td style={{ padding: "5px" }}>{formatPriceValue(template.adf)} ₽</td>
                            </tr>
                          )}
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Дуплекс:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.duplex)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Электроника:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.electronics)} ₽</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.modalActions}>
          <button type="button" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

