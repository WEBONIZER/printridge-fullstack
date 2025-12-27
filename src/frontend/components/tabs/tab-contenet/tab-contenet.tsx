import styles from './tab-contenet.module.css';
import { sanitizeHtml } from '../../../utils/html-sanitizer';
import { PhotoGallery } from '../../photo-gallery/photo-gallery';
import { VideosComponent } from '../../media-slider/videos-component/videos-component';
import { FC } from 'react';

interface TabContentProps {
    title?: string;
    text?: string;
    photos?: Array<string | { src: string; alt?: string }>;
    videos?: string[];
    activeMediaType: 'photos' | 'videos';
    onMediaTypeChange: (type: 'photos' | 'videos') => void;
    hasPhotos: boolean;
    hasVideos: boolean;
}

export const TabContent: FC<TabContentProps> = ({ 
    title, 
    text, 
    photos = [], 
    videos = [],
    activeMediaType,
    onMediaTypeChange,
    hasPhotos,
    hasVideos
}) => {
    const sanitizedTitle = sanitizeHtml(title || '');
    const sanitizedText = sanitizeHtml(text || '');

    // Нормализуем фотографии
    const normalizedPhotos = photos.map(p => {
        if (typeof p === 'string') return p;
        return (p as { src: string; alt?: string }).src || '';
    }).filter((url): url is string => !!url);

    // Нормализуем видео - убеждаемся, что URL полные
    const normalizedVideos = videos.map(v => {
        let url: string | null = null;
        if (typeof v === 'string') {
            url = v;
        } else {
            url = (v as any).src || v;
        }
        
        // Если URL относительный, делаем его абсолютным
        if (url && typeof url === 'string') {
            // Если URL уже полный (начинается с http:// или https://), оставляем как есть
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return url;
            }
            
            // Если URL начинается с /, добавляем базовый URL
            if (url.startsWith('/')) {
                // В продакшене используем текущий домен, в разработке - localhost:3000
                const baseUrl = import.meta.env.DEV 
                    ? 'http://localhost:3000' 
                    : window.location.origin;
                return `${baseUrl}${url}`;
            }
            
            // Если URL содержит домен S3 или другой домен без протокола, добавляем https://
            if (url.includes('s3.') || url.includes('storage.') || url.includes('amazonaws.com') || url.includes('beget.cloud') || url.includes('yandexcloud.net')) {
                return `https://${url}`;
            }
            
            // Иначе возвращаем как есть
            return url;
        }
        return null;
    }).filter((url): url is string => url !== null && typeof url === 'string');

    return (
        <div className={styles.tabcontent}>
            <h3 
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
            />
            <section 
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: sanitizedText }}
            />
            
            {/* Кнопки переключения фото/видео */}
            {(hasPhotos && hasVideos) && (
                <div className={styles.mediaButtons}>
                    <button
                        className={`${styles.mediaButton} ${activeMediaType === 'photos' ? styles.active : ''}`}
                        onClick={() => onMediaTypeChange('photos')}
                    >
                        Фото ({normalizedPhotos.length})
                    </button>
                    <button
                        className={`${styles.mediaButton} ${activeMediaType === 'videos' ? styles.active : ''}`}
                        onClick={() => onMediaTypeChange('videos')}
                    >
                        Видео ({normalizedVideos.length})
                    </button>
                </div>
            )}

            {/* Отображение медиа */}
            {activeMediaType === 'photos' && hasPhotos && (
                <PhotoGallery photos={normalizedPhotos} />
            )}
            
            {activeMediaType === 'videos' && hasVideos && (
                <VideosComponent videosArr={normalizedVideos} />
            )}

            {/* Если нет медиа */}
            {!hasPhotos && !hasVideos && (
                <div className={styles.noMedia}>Медиа не найдено</div>
            )}
        </div>
    );
}

