import React, { useRef } from "react";
import { Image, Video } from "../../utils/api";
import styles from "./examples.module.css";

interface MediaUploaderProps {
  photos: Image[];
  videos: Video[];
  onPhotosChange: (photos: Image[]) => void;
  onVideosChange: (videos: Video[]) => void;
  onPhotoAdd: (file: File) => Promise<void>;
  onVideoAdd: (file: File) => Promise<void>;
  onPhotoDelete: (photoId: string) => Promise<void>;
  onVideoDelete: (videoId: string) => Promise<void>;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  photos = [],
  videos = [],
  onPhotosChange,
  onVideosChange,
  onPhotoAdd,
  onVideoAdd,
  onPhotoDelete,
  onVideoDelete,
}) => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Загружаем все выбранные файлы
      const fileArray = Array.from(files);
      for (const file of fileArray) {
        await onPhotoAdd(file);
      }
      if (photoInputRef.current) {
        photoInputRef.current.value = "";
      }
    }
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Загружаем все выбранные файлы
      const fileArray = Array.from(files);
      for (const file of fileArray) {
        await onVideoAdd(file);
      }
      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
    }
  };

  const handlePhotoDeleteClick = async (photoId: string) => {
    if (window.confirm("Удалить эту фотографию?")) {
      await onPhotoDelete(photoId);
    }
  };

  const handleVideoDeleteClick = async (videoId: string) => {
    if (window.confirm("Удалить это видео?")) {
      await onVideoDelete(videoId);
    }
  };

  return (
    <>
      <div className={styles.formGroup}>
        <label>Фотографии (можно выбрать несколько)</label>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          style={{ width: "100%" }}
        />
        {photos && photos.length > 0 && (
          <div className={styles.mediaPreviewGrid}>
            {photos.map((photo) => (
              <div key={photo._id} className={styles.mediaPreviewItem}>
                <img
                  src={photo.src}
                  alt={photo.alt || "Фото"}
                  className={styles.mediaPreviewImage}
                />
                <button
                  type="button"
                  onClick={() => handlePhotoDeleteClick(photo._id)}
                  className={styles.mediaDeleteButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Видео (можно выбрать несколько)</label>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          multiple
          onChange={handleVideoChange}
          style={{ width: "100%" }}
        />
        {videos && videos.length > 0 && (
          <div className={styles.mediaPreviewGrid}>
            {videos.map((video) => (
              <div key={video._id} className={styles.mediaPreviewItemVideo}>
                <video
                  src={video.src}
                  controls
                  className={styles.mediaPreviewVideo}
                />
                <button
                  type="button"
                  onClick={() => handleVideoDeleteClick(video._id)}
                  className={styles.mediaDeleteButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

