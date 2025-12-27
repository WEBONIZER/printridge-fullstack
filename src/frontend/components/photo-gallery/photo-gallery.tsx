import { useState, FC, KeyboardEvent, MouseEvent } from 'react';
import styles from './photo-gallery.module.css';

interface Photo {
    src: string;
    alt?: string;
}

interface PhotoGalleryProps {
    photos?: Array<string | Photo>;
}

export const PhotoGallery: FC<PhotoGalleryProps> = ({ photos = [] }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Нормализуем массив фотографий
    const normalizedPhotos = photos.map((photo, index) => {
        if (typeof photo === 'string') {
            return { src: photo, alt: `Фото ${index + 1}` };
        }
        return {
            src: photo.src || '',
            alt: photo.alt || `Фото ${index + 1}`
        };
    }).filter((photo): photo is Photo => !!photo.src);

    if (normalizedPhotos.length === 0) {
        return null;
    }

    const openModal = (index: number) => {
        setSelectedIndex(index);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedIndex(null);
        document.body.style.overflow = 'unset'; // Разблокируем скролл
    };

    const nextPhoto = (e: MouseEvent | KeyboardEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % normalizedPhotos.length);
        }
    };

    const prevPhoto = (e: MouseEvent | KeyboardEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + normalizedPhotos.length) % normalizedPhotos.length);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            nextPhoto(e);
        } else if (e.key === 'ArrowLeft') {
            prevPhoto(e);
        }
    };

    return (
        <>
            <div className={styles.gallery}>
                {normalizedPhotos.map((photo, index) => (
                    <div
                        key={index}
                        className={styles.thumbnail}
                        onClick={() => openModal(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openModal(index);
                            }
                        }}
                        aria-label={`Открыть фото ${index + 1}`}
                    >
                        <img
                            src={photo.src}
                            alt={photo.alt}
                            loading="lazy"
                        />
                        <div className={styles.overlay}>
                            <span className={styles.viewIcon}>👁</span>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedIndex !== null && (
                <div
                    className={styles.modal}
                    onClick={closeModal}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    <button
                        className={styles.closeButton}
                        onClick={closeModal}
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                    <button
                        className={styles.navButtonLeft}
                        onClick={prevPhoto}
                        aria-label="Предыдущее фото"
                    >
                        ‹
                    </button>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={normalizedPhotos[selectedIndex].src}
                            alt={normalizedPhotos[selectedIndex].alt}
                            className={styles.modalImage}
                        />
                        <div className={styles.counter}>
                            {selectedIndex + 1} / {normalizedPhotos.length}
                        </div>
                    </div>
                    <button
                        className={styles.navButtonRight}
                        onClick={nextPhoto}
                        aria-label="Следующее фото"
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    );
};

