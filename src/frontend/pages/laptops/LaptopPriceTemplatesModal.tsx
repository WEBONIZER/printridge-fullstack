import React, { useState, useEffect } from "react";
import { ILaptopPriceTemplateSchema, getAllLaptopPriceTemplates, updateLaptopPriceTemplate } from "../../utils/api";
import styles from "./laptops.module.css";

interface LaptopPriceTemplatesModalProps {
  onClose: () => void;
}

export const LaptopPriceTemplatesModal: React.FC<LaptopPriceTemplatesModalProps> = ({ onClose }) => {
  const [templates, setTemplates] = useState<ILaptopPriceTemplateSchema[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<ILaptopPriceTemplateSchema | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      const response = await getAllLaptopPriceTemplates();
      setTemplates(response.data);
    } catch (error) {
      console.error("Ошибка загрузки прайсов:", error);
      alert("Ошибка загрузки прайсов");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (template: ILaptopPriceTemplateSchema) => {
    setEditingTemplate({ ...template });
  };

  const handleSave = async () => {
    if (!editingTemplate || !editingTemplate._id) return;

    try {
      setIsSaving(true);
      await updateLaptopPriceTemplate(editingTemplate._id, editingTemplate);
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

  const updateEditingField = (field: keyof ILaptopPriceTemplateSchema, value: number) => {
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
          <h2>Управление прайсами ноутбуков</h2>
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
                          { key: "thermalPaste" as const, label: "Термопаста" },
                          { key: "installOS" as const, label: "Установка ОС" },
                          { key: "installPO" as const, label: "Установка ПО" },
                          { key: "antivirus" as const, label: "Антивирус" },
                          { key: "matrixReplacement" as const, label: "Замена матрицы" },
                          { key: "batteryReplacement" as const, label: "Замена батареи" },
                          { key: "ramReplacement" as const, label: "Замена RAM" },
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
                            <td style={{ padding: "5px", fontWeight: 500 }}>Термопаста:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.thermalPaste)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Установка ОС:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.installOS)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Установка ПО:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.installPO)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Антивирус:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.antivirus)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Замена матрицы:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.matrixReplacement)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Замена батареи:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.batteryReplacement)} ₽</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "5px", fontWeight: 500 }}>Замена RAM:</td>
                            <td style={{ padding: "5px" }}>{formatPriceValue(template.ramReplacement)} ₽</td>
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

