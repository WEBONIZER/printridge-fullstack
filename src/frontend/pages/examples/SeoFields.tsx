import React, { useMemo, useState, useRef, useEffect } from "react";
import styles from "./examples.module.css";
import { generateSeoSuggestions, canGenerateSuggestions, SeoSuggestions } from "./seo-suggestions";
import { Image } from "../../utils/api";
import { generateRouteFromTitle } from "../../utils/transliterate";

interface SeoFormData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  route?: string;
}

interface SeoFieldsProps {
  formData: SeoFormData;
  onFormDataChange: (data: Partial<SeoFormData>) => void;
  title: string;
  text: string;
  photos?: Image[];
}

export const SeoFields: React.FC<SeoFieldsProps> = ({ formData, onFormDataChange, title, text, photos = [] }) => {
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [isRouteManuallyEdited, setIsRouteManuallyEdited] = useState(false);
  const imageSelectorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (imageSelectorRef.current && !imageSelectorRef.current.contains(event.target as Node)) {
        setShowImageSelector(false);
      }
    };

    if (showImageSelector) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showImageSelector]);
  
  // Автоматически генерируем route из title, если он не был изменен вручную
  useEffect(() => {
    if (!isRouteManuallyEdited && title) {
      const generatedRoute = generateRouteFromTitle(title);
      if (generatedRoute && generatedRoute !== formData.route) {
        onFormDataChange({ route: generatedRoute });
      }
    }
  }, [title, isRouteManuallyEdited]);
  
  const getCharCount = (value: string | undefined, max: number) => {
    return value ? `${value.length}/${max}` : `0/${max}`;
  };
  
  const handleSelectImage = (imageSrc: string) => {
    onFormDataChange({ ogImage: imageSrc });
    setShowImageSelector(false);
  };
  
  const handleRouteChange = (value: string) => {
    setIsRouteManuallyEdited(true);
    onFormDataChange({ route: value });
  };
  
  const handleGenerateRoute = () => {
    const generatedRoute = generateRouteFromTitle(title);
    if (generatedRoute) {
      onFormDataChange({ route: generatedRoute });
      setIsRouteManuallyEdited(false);
    }
  };

  // Генерируем предложения на основе title и text
  const suggestions = useMemo(() => {
    if (canGenerateSuggestions(title, text)) {
      return generateSeoSuggestions(title, text);
    }
    return null;
  }, [title, text]);

  const handleApplySuggestion = (field: keyof SeoSuggestions) => {
    if (suggestions) {
      onFormDataChange({ [field]: suggestions[field] });
    }
  };

  const handleApplyAll = () => {
    if (suggestions) {
      onFormDataChange({
        metaTitle: suggestions.metaTitle,
        metaDescription: suggestions.metaDescription,
        metaKeywords: suggestions.metaKeywords,
        ogTitle: suggestions.ogTitle,
        ogDescription: suggestions.ogDescription,
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
      
      {/* Meta Title */}
      <div className={styles.formGroup}>
        <label>
          Meta Title (Title для поисковых систем)
          <span className={styles.charCount}>{getCharCount(formData.metaTitle, 60)}</span>
        </label>
        <div className={styles.inputWithSuggestion}>
          <input
            type="text"
            value={formData.metaTitle || ""}
            onChange={(e) => onFormDataChange({ metaTitle: e.target.value })}
            maxLength={60}
            placeholder="Оптимально 50-60 символов"
          />
          {suggestions && suggestions.metaTitle && (
            <button
              type="button"
              onClick={() => handleApplySuggestion("metaTitle")}
              className={styles.suggestionButton}
              title={`Использовать: ${suggestions.metaTitle}`}
            >
              ✨
            </button>
          )}
        </div>
        {suggestions && suggestions.metaTitle && (
          <div className={styles.suggestionPreview}>
            Предложение: <span className={styles.suggestionText}>{suggestions.metaTitle}</span>
          </div>
        )}
        <small className={styles.hint}>
          Заголовок страницы в результатах поиска. Должен быть уникальным и содержать ключевые слова.
        </small>
      </div>

      {/* Meta Description */}
      <div className={styles.formGroup}>
        <label>
          Meta Description (Описание для поисковых систем)
          <span className={styles.charCount}>{getCharCount(formData.metaDescription, 160)}</span>
        </label>
        <div className={styles.inputWithSuggestion}>
          <textarea
            value={formData.metaDescription || ""}
            onChange={(e) => onFormDataChange({ metaDescription: e.target.value })}
            maxLength={160}
            rows={3}
            placeholder="Оптимально 150-160 символов"
          />
          {suggestions && suggestions.metaDescription && (
            <button
              type="button"
              onClick={() => handleApplySuggestion("metaDescription")}
              className={styles.suggestionButton}
              title={`Использовать: ${suggestions.metaDescription.substring(0, 50)}...`}
            >
              ✨
            </button>
          )}
        </div>
        {suggestions && suggestions.metaDescription && (
          <div className={styles.suggestionPreview}>
            Предложение: <span className={styles.suggestionText}>{suggestions.metaDescription}</span>
          </div>
        )}
        <small className={styles.hint}>
          Краткое описание страницы, которое отображается в результатах поиска. Должно быть привлекательным и информативным.
        </small>
      </div>

      {/* Meta Keywords */}
      <div className={styles.formGroup}>
        <label>Meta Keywords (Ключевые слова)</label>
        <div className={styles.inputWithSuggestion}>
          <input
            type="text"
            value={formData.metaKeywords || ""}
            onChange={(e) => onFormDataChange({ metaKeywords: e.target.value })}
            placeholder="Ключевые слова через запятую"
          />
          {suggestions && suggestions.metaKeywords && (
            <button
              type="button"
              onClick={() => handleApplySuggestion("metaKeywords")}
              className={styles.suggestionButton}
              title={`Использовать: ${suggestions.metaKeywords}`}
            >
              ✨
            </button>
          )}
        </div>
        {suggestions && suggestions.metaKeywords && (
          <div className={styles.suggestionPreview}>
            Предложение: <span className={styles.suggestionText}>{suggestions.metaKeywords}</span>
          </div>
        )}
        <small className={styles.hint}>
          Ключевые слова, релевантные для этой страницы. Разделяйте запятыми.
        </small>
      </div>

      {/* Open Graph Title */}
      <div className={styles.formGroup}>
        <label>
          Open Graph Title (Заголовок для соцсетей)
          <span className={styles.charCount}>{getCharCount(formData.ogTitle, 60)}</span>
        </label>
        <div className={styles.inputWithSuggestion}>
          <input
            type="text"
            value={formData.ogTitle || ""}
            onChange={(e) => onFormDataChange({ ogTitle: e.target.value })}
            maxLength={60}
            placeholder="Заголовок при публикации в соцсетях"
          />
          {suggestions && suggestions.ogTitle && (
            <button
              type="button"
              onClick={() => handleApplySuggestion("ogTitle")}
              className={styles.suggestionButton}
              title={`Использовать: ${suggestions.ogTitle}`}
            >
              ✨
            </button>
          )}
        </div>
        {suggestions && suggestions.ogTitle && (
          <div className={styles.suggestionPreview}>
            Предложение: <span className={styles.suggestionText}>{suggestions.ogTitle}</span>
          </div>
        )}
        <small className={styles.hint}>
          Заголовок, который будет отображаться при публикации ссылки в социальных сетях (Facebook, VK и др.).
        </small>
      </div>

      {/* Open Graph Description */}
      <div className={styles.formGroup}>
        <label>
          Open Graph Description (Описание для соцсетей)
          <span className={styles.charCount}>{getCharCount(formData.ogDescription, 200)}</span>
        </label>
        <div className={styles.inputWithSuggestion}>
          <textarea
            value={formData.ogDescription || ""}
            onChange={(e) => onFormDataChange({ ogDescription: e.target.value })}
            maxLength={200}
            rows={3}
            placeholder="Описание при публикации в соцсетях"
          />
          {suggestions && suggestions.ogDescription && (
            <button
              type="button"
              onClick={() => handleApplySuggestion("ogDescription")}
              className={styles.suggestionButton}
              title={`Использовать: ${suggestions.ogDescription.substring(0, 50)}...`}
            >
              ✨
            </button>
          )}
        </div>
        {suggestions && suggestions.ogDescription && (
          <div className={styles.suggestionPreview}>
            Предложение: <span className={styles.suggestionText}>{suggestions.ogDescription}</span>
          </div>
        )}
        <small className={styles.hint}>
          Описание, которое будет отображаться при публикации ссылки в социальных сетях.
        </small>
      </div>

      {/* Open Graph Image */}
      <div className={styles.formGroup}>
        <label>Open Graph Image (URL изображения для соцсетей)</label>
        <div className={styles.inputWithSuggestion}>
          <input
            type="url"
            value={formData.ogImage || ""}
            onChange={(e) => onFormDataChange({ ogImage: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
          {photos && photos.length > 0 && (
            <button
              type="button"
              onClick={() => setShowImageSelector(!showImageSelector)}
              className={styles.selectImageButton}
              title="Выбрать из существующих изображений"
            >
              🖼️
            </button>
          )}
        </div>
        {photos && photos.length > 0 && showImageSelector && (
          <div ref={imageSelectorRef} className={styles.imageSelector}>
            <div className={styles.imageSelectorHeader}>
              <span>Выберите изображение:</span>
              <button
                type="button"
                onClick={() => setShowImageSelector(false)}
                className={styles.closeSelectorButton}
              >
                ×
              </button>
            </div>
            <div className={styles.imageSelectorGrid}>
              {photos.map((photo) => (
                <div
                  key={photo._id}
                  className={`${styles.imageSelectorItem} ${formData.ogImage === photo.src ? styles.imageSelectorItemSelected : ""}`}
                  onClick={() => handleSelectImage(photo.src)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt || "Изображение"}
                    className={styles.imageSelectorThumbnail}
                  />
                  <div className={styles.imageSelectorOverlay}>
                    <span className={styles.imageSelectorCheck}>✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {formData.ogImage && (
          <div className={styles.ogImagePreview}>
            <span>Предпросмотр:</span>
            <img
              src={formData.ogImage}
              alt="OG Image Preview"
              className={styles.ogImagePreviewImg}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
        <small className={styles.hint}>
          URL изображения, которое будет отображаться при публикации ссылки в социальных сетях. Рекомендуемый размер: 1200x630px.
          {photos && photos.length > 0 && " Нажмите на иконку 🖼️, чтобы выбрать из существующих изображений."}
        </small>
      </div>

      {/* Route */}
      <div className={styles.formGroup}>
        <label>
          Route (URL-маршрут для блога)
          <span className={styles.charCount}>{getCharCount(formData.route, 100)}</span>
        </label>
        <div className={styles.inputWithSuggestion}>
          <input
            type="text"
            value={formData.route || ""}
            onChange={(e) => handleRouteChange(e.target.value)}
            onBlur={() => {
              // Нормализуем route при потере фокуса
              const normalized = formData.route?.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
              if (normalized && normalized !== formData.route) {
                onFormDataChange({ route: normalized });
              }
            }}
            maxLength={100}
            placeholder="url-friendly-route"
            pattern="[a-z0-9-]+"
          />
          <button
            type="button"
            onClick={handleGenerateRoute}
            className={styles.suggestionButton}
            title="Сгенерировать route из заголовка"
          >
            🔄
          </button>
        </div>
        <small className={styles.hint}>
          URL-friendly маршрут для блога. Генерируется автоматически из заголовка, но можно изменить вручную. Используется для создания ссылок на статью.
        </small>
      </div>
    </div>
  );
};

