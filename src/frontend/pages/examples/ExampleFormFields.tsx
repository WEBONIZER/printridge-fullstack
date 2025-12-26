import React from "react";
import { HtmlEditor } from "./HtmlEditor";
import { DeviceNamesSelector } from "./DeviceNamesSelector";
import { MediaUploader } from "./MediaUploader";
import { SeoFields } from "./SeoFields";
import { Image, Video } from "../../utils/api";
import styles from "./examples.module.css";

interface ExampleFormData {
  title: string;
  text: string;
  cartridgeNames: string[];
  printerNames: string[];
  laptopNames: string[];
  public?: boolean;
  // SEO метатеги
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  route?: string;
}

interface ExampleFormFieldsProps {
  formData: ExampleFormData;
  onFormDataChange: (data: Partial<ExampleFormData>) => void;
  photos?: Image[];
  videos?: Video[];
  onPhotoAdd?: (file: File) => Promise<void>;
  onVideoAdd?: (file: File) => Promise<void>;
  onPhotoDelete?: (photoId: string) => Promise<void>;
  onVideoDelete?: (videoId: string) => Promise<void>;
}

export const ExampleFormFields: React.FC<ExampleFormFieldsProps> = ({
  formData,
  onFormDataChange,
  photos = [],
  videos = [],
  onPhotoAdd,
  onVideoAdd,
  onPhotoDelete,
  onVideoDelete,
}) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label>Заголовок *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onFormDataChange({ title: e.target.value })}
          required
        />
      </div>

      <HtmlEditor
        value={formData.text}
        onChange={(value) => onFormDataChange({ text: value })}
        label="Текст (HTML) *"
        required
      />

      <DeviceNamesSelector
        deviceType="cartridge"
        selectedNames={formData.cartridgeNames || []}
        onNamesChange={(names) => onFormDataChange({ cartridgeNames: names })}
        label="Картриджи"
      />

      <DeviceNamesSelector
        deviceType="printer"
        selectedNames={formData.printerNames || []}
        onNamesChange={(names) => onFormDataChange({ printerNames: names })}
        label="Принтеры"
      />

      <DeviceNamesSelector
        deviceType="laptop"
        selectedNames={formData.laptopNames || []}
        onNamesChange={(names) => onFormDataChange({ laptopNames: names })}
        label="Ноутбуки"
      />

      {(onPhotoAdd || onVideoAdd || onPhotoDelete || onVideoDelete) && (
        <MediaUploader
          photos={photos}
          videos={videos}
          onPhotosChange={() => {}}
          onVideosChange={() => {}}
          onPhotoAdd={onPhotoAdd || (async () => {})}
          onVideoAdd={onVideoAdd || (async () => {})}
          onPhotoDelete={onPhotoDelete || (async () => {})}
          onVideoDelete={onVideoDelete || (async () => {})}
        />
      )}

      <div className={styles.formGroup}>
        <label>
          <input
            type="checkbox"
            checked={formData.public !== false}
            onChange={(e) => onFormDataChange({ public: e.target.checked })}
          />
          Публичный
        </label>
      </div>

      <SeoFields
        formData={formData}
        onFormDataChange={onFormDataChange}
        title={formData.title}
        text={formData.text}
        photos={photos}
      />
    </>
  );
};
