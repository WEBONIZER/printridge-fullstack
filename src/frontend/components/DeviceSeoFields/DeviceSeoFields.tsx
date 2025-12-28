import React, { useMemo } from "react";
import styles from "./DeviceSeoFields.module.css";

interface DeviceSeoFormData {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

interface DeviceSeoFieldsProps {
  formData: DeviceSeoFormData;
  onFormDataChange: (data: Partial<DeviceSeoFormData>) => void;
  suggestions: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
  } | null;
}

const getCharCount = (text: string | undefined, max: number): string => {
  const length = text?.length || 0;
  const color = length > max ? "red" : length > max * 0.9 ? "orange" : "green";
  return `${length}/${max}`;
};

export const DeviceSeoFields: React.FC<DeviceSeoFieldsProps> = ({
  formData,
  onFormDataChange,
  suggestions,
}) => {
  const handleApplySuggestion = (field: keyof DeviceSeoFormData) => {
    if (suggestions) {
      onFormDataChange({ [field]: suggestions[field] });
    }
  };

  const handleApplyAll = () => {
    if (suggestions) {
      onFormDataChange({
        seoTitle: suggestions.seoTitle,
        seoDescription: suggestions.seoDescription,
        seoKeywords: suggestions.seoKeywords,
      });
    }
  };

  return (
    <div className={styles.seoSection}>
      <div className={styles.seoSectionHeader}>
        <h3 className={styles.seoSectionTitle}>SEO метатеги</h3>
        {suggestions && (
          <button
            type="button"
            onClick={handleApplyAll}
            className={styles.suggestAllButton}
            title="Применить все предложения"
          >
            ✨ Применить все предложения
          </button>
        )}
      </div>

      {/* SEO Title */}
      <div className={styles.formGroup}>
        <label>
          SEO Title (Заголовок для поисковых систем)
          <span className={styles.charCount}>{getCharCount(formData.seoTitle, 60)}</span>
        </label>
        <div className={styles.inputWithButton}>
          <input
            type="text"
            value={formData.seoTitle || ""}
            onChange={(e) => onFormDataChange({ seoTitle: e.target.value })}
            maxLength={60}
            placeholder="Ремонт Minolta Bizhub 223 в СПб"
          />
          {suggestions && suggestions.seoTitle && (
            <button
              type="button"
              onClick={() => handleApplySuggestion("seoTitle")}
              className={styles.suggestButton}
              title={`Использовать: ${suggestions.seoTitle}`}
            >
              ✨
            </button>
          )}
        </div>
        {suggestions && suggestions.seoTitle && (
          <div className={styles.suggestion}>
            Предложение: <span className={styles.suggestionText}>{suggestions.seoTitle}</span>
          </div>
        )}
        <small className={styles.helpText}>
          Рекомендуемая длина: 50-60 символов. Включите название модели и город.
        </small>
      </div>

      {/* SEO Description */}
      <div className={styles.formGroup}>
        <label>
          SEO Description (Описание для поисковых систем)
          <span className={styles.charCount}>{getCharCount(formData.seoDescription, 160)}</span>
        </label>
        <div className={styles.inputWithButton}>
          <textarea
            value={formData.seoDescription || ""}
            onChange={(e) => onFormDataChange({ seoDescription: e.target.value })}
            maxLength={160}
            rows={3}
            placeholder="Ремонт принтера Minolta Bizhub 223 в Санкт-Петербурге. Выезд мастера. Гарантия."
          />
          {suggestions && suggestions.seoDescription && (
            <button
              type="button"
              onClick={() => handleApplySuggestion("seoDescription")}
              className={styles.suggestButton}
              title={`Использовать: ${suggestions.seoDescription.substring(0, 50)}...`}
            >
              ✨
            </button>
          )}
        </div>
        {suggestions && suggestions.seoDescription && (
          <div className={styles.suggestion}>
            Предложение: <span className={styles.suggestionText}>{suggestions.seoDescription}</span>
          </div>
        )}
        <small className={styles.helpText}>
          Рекомендуемая длина: 150-160 символов. Опишите услугу и преимущества.
        </small>
      </div>

      {/* SEO Keywords */}
      <div className={styles.formGroup}>
        <label>SEO Keywords (Ключевые слова через запятую)</label>
        <div className={styles.inputWithButton}>
          <input
            type="text"
            value={formData.seoKeywords || ""}
            onChange={(e) => onFormDataChange({ seoKeywords: e.target.value })}
            placeholder="ремонт minolta bizhub 223, ремонт принтеров спб, выезд мастера"
          />
          {suggestions && suggestions.seoKeywords && (
            <button
              type="button"
              onClick={() => handleApplySuggestion("seoKeywords")}
              className={styles.suggestButton}
              title={`Использовать: ${suggestions.seoKeywords}`}
            >
              ✨
            </button>
          )}
        </div>
        {suggestions && suggestions.seoKeywords && (
          <div className={styles.suggestion}>
            Предложение: <span className={styles.suggestionText}>{suggestions.seoKeywords}</span>
          </div>
        )}
        <small className={styles.helpText}>
          Ключевые слова через запятую. Включите название модели, тип устройства, город.
        </small>
      </div>
    </div>
  );
};

