import React, { useState, useEffect } from "react";
import { Example, updateExample, uploadImage, uploadVideo, deleteImage, deleteVideo, getExamplePhotos, getExampleVideos, Image, Video } from "../../utils/api";
import { ExampleFormFields } from "./ExampleFormFields";
import styles from "./examples.module.css";

interface EditExampleModalProps {
  example: Example;
  onClose: () => void;
  onSave: () => void;
}

export const EditExampleModal: React.FC<EditExampleModalProps> = ({ example, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: example.title || "",
    text: example.text || "",
    cartridgeNames: example.cartridgeNames || [],
    printerNames: example.printerNames || [],
    laptopNames: example.laptopNames || [],
    public: example.public !== false,
    // SEO метатеги
    metaTitle: example.metaTitle || "",
    metaDescription: example.metaDescription || "",
    metaKeywords: example.metaKeywords || "",
    ogTitle: example.ogTitle || "",
    ogDescription: example.ogDescription || "",
    ogImage: example.ogImage || "",
    route: example.route || "",
  });
  const [photos, setPhotos] = useState<Image[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [photoFiles, setPhotoFiles] = useState<Map<string, File>>(new Map());
  const [videoFiles, setVideoFiles] = useState<Map<string, File>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        setIsLoading(true);
        const [photosRes, videosRes] = await Promise.all([
          getExamplePhotos(example._id),
          getExampleVideos(example._id),
        ]);
        
        // API возвращает PaginatedResponse, где data - это массив
        const photosData = photosRes?.data || [];
        const videosData = videosRes?.data || [];
        
        // Убеждаемся, что это массивы и преобразуем в правильный формат
        const photosArray: Image[] = Array.isArray(photosData) 
          ? photosData
              .filter((photo: any) => photo && photo._id && photo.src)
              .map((photo: any) => ({
                _id: photo._id || photo.id,
                src: photo.src || photo.url,
                alt: photo.alt || "",
                cartridgeId: photo.cartridgeId,
                printerId: photo.printerId,
                laptopId: photo.laptopId,
                exampleId: photo.exampleId,
                createdAt: photo.createdAt,
                updatedAt: photo.updatedAt,
              }))
          : [];
        const videosArray: Video[] = Array.isArray(videosData)
          ? videosData
              .filter((video: any) => video && video._id && video.src)
              .map((video: any) => ({
                _id: video._id || video.id,
                src: video.src || video.url,
                cartridgeId: video.cartridgeId,
                printerId: video.printerId,
                laptopId: video.laptopId,
                exampleId: video.exampleId,
                createdAt: video.createdAt,
                updatedAt: video.updatedAt,
              }))
          : [];
        
        setPhotos(photosArray);
        setVideos(videosArray);
      } catch (error) {
        console.error("Ошибка загрузки медиа:", error);
        setPhotos([]);
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (example._id) {
      loadMedia();
    } else {
      setIsLoading(false);
    }
  }, [example._id]);

  const handlePhotoAdd = async (file: File) => {
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    setPhotoFiles(new Map(photoFiles).set(tempId, file));
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
    const url = URL.createObjectURL(file);
    const newVideo: Video = {
      _id: tempId,
      src: url,
    };
    setVideos([...videos, newVideo]);
  };

  const handlePhotoDelete = async (photoId: string) => {
    if (photoId.startsWith("temp-")) {
      photoFiles.delete(photoId);
      setPhotoFiles(new Map(photoFiles));
      setPhotos(photos.filter((photo) => photo._id !== photoId));
    } else {
      try {
        await deleteImage(photoId);
        setPhotos(photos.filter((photo) => photo._id !== photoId));
      } catch (error) {
        console.error("Ошибка удаления фотографии:", error);
        alert("Ошибка удаления фотографии");
      }
    }
  };

  const handleVideoDelete = async (videoId: string) => {
    if (videoId.startsWith("temp-")) {
      const video = videos.find((v) => v._id === videoId);
      if (video && video.src.startsWith("blob:")) {
        URL.revokeObjectURL(video.src);
      }
      videoFiles.delete(videoId);
      setVideoFiles(new Map(videoFiles));
      setVideos(videos.filter((video) => video._id !== videoId));
    } else {
      try {
        await deleteVideo(videoId);
        setVideos(videos.filter((video) => video._id !== videoId));
      } catch (error) {
        console.error("Ошибка удаления видео:", error);
        alert("Ошибка удаления видео");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateExample(example._id, {
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
      });

      // Загружаем новые фотографии
      for (const [tempId, photoFile] of photoFiles) {
        try {
          await uploadImage(photoFile, { exampleId: example._id });
        } catch (error) {
          console.error("Ошибка загрузки фотографии:", error);
        }
      }

      // Загружаем новые видео
      for (const [tempId, videoFile] of videoFiles) {
        try {
          if (!(videoFile instanceof File)) {
            continue;
          }
          
          await uploadVideo(videoFile, { exampleId: example._id });
        } catch (error) {
          console.error(`Ошибка загрузки видео ${tempId}:`, error);
        }
      }

      onSave();
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: "40px", textAlign: "center" }}>Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "1200px" }}>
        <div className={styles.modalHeader}>
          <h2>Редактировать пример</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <ExampleFormFields
            formData={formData}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
            photos={photos || []}
            videos={videos || []}
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
              {isSaving ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
