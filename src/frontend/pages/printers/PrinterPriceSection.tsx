import React, { useState, useEffect } from "react";
import { getAllPrinterPriceTemplates } from "../../utils/api";
import { determinePrinterPriceType } from "../../utils/device-price-helpers";
import { IPrinterPriceTemplateSchema } from "../../../utils/types";
import styles from "./printers.module.css";

interface PrinterPriceSectionProps {
  currentPriceId?: string;
  device?: string;
  type?: string;
  format?: string;
  capacity?: number;
  onPriceChange: (priceId: string | null) => void;
}

export const PrinterPriceSection: React.FC<PrinterPriceSectionProps> = ({
  currentPriceId,
  device,
  type,
  format,
  capacity,
  onPriceChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [allTemplates, setAllTemplates] = useState<IPrinterPriceTemplateSchema[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<IPrinterPriceTemplateSchema | null>(null);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(currentPriceId || null);
  const [recommendedPriceType, setRecommendedPriceType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    if (currentPriceId && allTemplates.length > 0) {
      const template = allTemplates.find(t => t._id === currentPriceId);
      setCurrentTemplate(template || null);
      setSelectedPriceId(currentPriceId);
    } else {
      setCurrentTemplate(null);
      setSelectedPriceId(null);
    }

    // Определяем рекомендованный прайс
    if (device && type && format && capacity !== undefined) {
      const priceType = determinePrinterPriceType(device, type, format, capacity);
      setRecommendedPriceType(priceType);
    } else {
      setRecommendedPriceType(null);
    }
  }, [currentPriceId, allTemplates, device, type, format, capacity]);

  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPrinterPriceTemplates();
      setAllTemplates(response.data);
    } catch (error) {
      console.error("Ошибка загрузки прайсов:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriceSelect = (priceId: string) => {
    setSelectedPriceId(priceId);
    const template = allTemplates.find(t => t._id === priceId);
    setCurrentTemplate(template || null);
    onPriceChange(priceId);
  };

  const formatPriceValue = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "-";
    return value.toLocaleString("ru-RU");
  };

  return (
    <div className={styles.formGroup}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            cursor: "pointer",
            backgroundColor: "#f8f9fa",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div>
            <strong>Прайс:</strong>{" "}
            {currentTemplate
              ? `${currentTemplate.priceType} (ID: ${currentTemplate._id})`
              : "Не выбран"}
          </div>
          <div>{isExpanded ? "▼" : "▶"}</div>
        </div>

        {isExpanded && (
          <div style={{ padding: "12px" }}>
            {recommendedPriceType && (
              <div
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "#e7f3ff",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <strong>Рекомендуемый прайс:</strong> {recommendedPriceType}
                {recommendedPriceType && (
                  <button
                    type="button"
                    onClick={() => {
                      const recommended = allTemplates.find(
                        t => t.priceType === recommendedPriceType
                      );
                      if (recommended) {
                        handlePriceSelect(recommended._id!);
                      }
                    }}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Применить
                  </button>
                )}
              </div>
            )}

            <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
              Выберите прайс:
            </label>
            <select
              value={selectedPriceId || ""}
              onChange={(e) => {
                const priceId = e.target.value;
                if (priceId) {
                  handlePriceSelect(priceId);
                } else {
                  setSelectedPriceId(null);
                  setCurrentTemplate(null);
                  onPriceChange(null);
                }
              }}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginBottom: "15px",
              }}
            >
              <option value="">-- Не выбран --</option>
              {allTemplates.map((template) => (
                <option key={template._id} value={template._id}>
                  {template.priceType}
                </option>
              ))}
            </select>

            {currentTemplate && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <h4 style={{ marginTop: 0, marginBottom: "10px" }}>
                  Текущий прайс: {currentTemplate.priceType}
                </h4>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: "5px", fontWeight: 500 }}>Диагностика:</td>
                      <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.diagnostics)} ₽</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", fontWeight: 500 }}>ТО:</td>
                      <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.TO)} ₽</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", fontWeight: 500 }}>Ролики:</td>
                      <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.rollers)} ₽</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", fontWeight: 500 }}>Барабан:</td>
                      <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.drum)} ₽</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", fontWeight: 500 }}>Лазер:</td>
                      <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.laser)} ₽</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", fontWeight: 500 }}>Термоблок:</td>
                      <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.therm)} ₽</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", fontWeight: 500 }}>Редуктор:</td>
                      <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.reducer)} ₽</td>
                    </tr>
                    {currentTemplate.scaner !== null && currentTemplate.scaner !== undefined && (
                      <tr>
                        <td style={{ padding: "5px", fontWeight: 500 }}>Сканер:</td>
                        <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.scaner)} ₽</td>
                      </tr>
                    )}
                    {currentTemplate.adf !== null && currentTemplate.adf !== undefined && (
                      <tr>
                        <td style={{ padding: "5px", fontWeight: 500 }}>АДФ:</td>
                        <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.adf)} ₽</td>
                      </tr>
                    )}
                    <tr>
                      <td style={{ padding: "5px", fontWeight: 500 }}>Дуплекс:</td>
                      <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.duplex)} ₽</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", fontWeight: 500 }}>Электроника:</td>
                      <td style={{ padding: "5px" }}>{formatPriceValue(currentTemplate.electronics)} ₽</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

