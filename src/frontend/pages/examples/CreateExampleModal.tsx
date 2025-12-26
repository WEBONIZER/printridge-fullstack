import React, { useState } from "react";
import { createExample, uploadImage, uploadVideo, Image, Video } from "../../utils/api";
import { ExampleFormFields } from "./ExampleFormFields";
import styles from "./examples.module.css";

interface CreateExampleModalProps {
  onClose: () => void;
  onSave: () => void;
}

export const CreateExampleModal: React.FC<CreateExampleModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    cartridgeNames: [] as string[],
    printerNames: [] as string[],
    laptopNames: [] as string[],
    public: true,
    // SEO метатеги
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    route: "",
  });
  const [photoFiles, setPhotoFiles] = useState<Map<string, File>>(new Map());
  const [videoFiles, setVideoFiles] = useState<Map<string, File>>(new Map());
  const [photos, setPhotos] = useState<Image[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handlePhotoAdd = async (file: File) => {
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    setPhotoFiles(new Map(photoFiles).set(tempId, file));
    // Создаем превью
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhoto: Image = {
        _id: tempId,
        src: e.target?.result as string,
        alt: file.name,
      };
      setPhotos([...photos, newPhoto]);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoAdd = async (file: File) => {
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    setVideoFiles(new Map(videoFiles).set(tempId, file));
    // Создаем превью
    const url = URL.createObjectURL(file);
    const newVideo: Video = {
      _id: tempId,
      src: url,
    };
    setVideos([...videos, newVideo]);
  };

  const handlePhotoDelete = async (photoId: string) => {
    photoFiles.delete(photoId);
    setPhotoFiles(new Map(photoFiles));
    setPhotos(photos.filter((photo) => photo._id !== photoId));
  };

  const handleVideoDelete = async (videoId: string) => {
    const video = videos.find((v) => v._id === videoId);
    if (video && video.src.startsWith("blob:")) {
      URL.revokeObjectURL(video.src);
    }
    videoFiles.delete(videoId);
    setVideoFiles(new Map(videoFiles));
    setVideos(videos.filter((video) => video._id !== videoId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const exampleData = {
        title: formData.title.trim(),
        text: formData.text.trim(),
        cartridgeNames: formData.cartridgeNames,
        printerNames: formData.printerNames,
        laptopNames: formData.laptopNames,
        public: formData.public,
        // SEO метатеги
        metaTitle: formData.metaTitle?.trim() || undefined,
        metaDescription: formData.metaDescription?.trim() || undefined,
        metaKeywords: formData.metaKeywords?.trim() || undefined,
        ogTitle: formData.ogTitle?.trim() || undefined,
        ogDescription: formData.ogDescription?.trim() || undefined,
        ogImage: formData.ogImage?.trim() || undefined,
      };

      const createdExample = await createExample(exampleData);
      const exampleId = createdExample.data.id || createdExample.data._id;

      // Загружаем фотографии с exampleId
      for (const [tempId, photoFile] of photoFiles) {
        try {
          await uploadImage(photoFile, { exampleId });
        } catch (error) {
          console.error("Ошибка загрузки фотографии:", error);
        }
      }

      // Загружаем видео с exampleId
      for (const [tempId, videoFile] of videoFiles) {
        try {
          await uploadVideo(videoFile, { exampleId });
        } catch (error) {
          console.error("Ошибка загрузки видео:", error);
        }
      }

      onSave();
    } catch (error: any) {
      console.error("Ошибка создания примера:", error);
      alert(error.response?.data?.error || "Ошибка создания примера");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "1200px" }}>
        <div className={styles.modalHeader}>
          <h2>Добавить пример</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <ExampleFormFields
            formData={formData}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
            photos={photos}
            videos={videos}
            onPhotoAdd={handlePhotoAdd}
            onVideoAdd={handleVideoAdd}
            onPhotoDelete={handlePhotoDelete}
            onVideoDelete={handleVideoDelete}
          />

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} disabled={isSaving}>
              Отмена
            </button>
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Сохранение..." : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
