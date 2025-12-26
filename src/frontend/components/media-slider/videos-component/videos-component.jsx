import styles from './videos-component.module.css'
import { useState, useEffect, useRef } from "react";

const VideosComponent = ({ videosArr }) => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [videoError, setVideoError] = useState(null);
    const videoRef = useRef(null);

    if (!videosArr || videosArr.length === 0) {
        return null;
    }

    // Извлекаем URL из объектов Video или строк
    const videoUrls = videosArr.map(v => {
        if (typeof v === 'string') {
            return v;
        }
        // Если это объект Video с полем src
        return v.src || v;
    }).filter(url => url && typeof url === 'string'); // Фильтруем пустые значения и проверяем тип

    if (videoUrls.length === 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrentVideo((prev) => (prev === videoUrls.length - 1 ? 0 : prev + 1));
        setVideoError(null);
    };

    const prevSlide = () => {
        setCurrentVideo((prev) => (prev === 0 ? videoUrls.length - 1 : prev - 1));
        setVideoError(null);
    };

    const handleVideoError = (e) => {
        const video = e.target;
        const error = video.error;
        let errorMessage = 'Ошибка загрузки видео.';
        
        if (error) {
            switch (error.code) {
                case error.MEDIA_ERR_ABORTED:
                    errorMessage = 'Загрузка видео была прервана.';
                    break;
                case error.MEDIA_ERR_NETWORK:
                    errorMessage = 'Ошибка сети при загрузке видео. Возможна проблема с CORS или доступом к файлу.';
                    break;
                case error.MEDIA_ERR_DECODE:
                    errorMessage = 'Ошибка декодирования видео. Файл может быть поврежден или в неподдерживаемом формате.';
                    break;
                case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    errorMessage = 'Формат видео не поддерживается браузером.';
                    break;
                default:
                    errorMessage = `Ошибка загрузки видео (код: ${error.code}).`;
            }
        }
        
        setVideoError(errorMessage);
    };

    const handleVideoLoadStart = () => {
        setVideoError(null);
    };

    const handleVideoCanPlay = () => {
        setVideoError(null);
    };

    const handleVideoLoadedMetadata = () => {
        console.log('Метаданные видео загружены:', {
            url: videoUrls[currentVideo],
            duration: videoRef.current?.duration,
            videoWidth: videoRef.current?.videoWidth,
            videoHeight: videoRef.current?.videoHeight
        });
    };

    const handleVideoStalled = () => {
        console.warn('Загрузка видео остановилась:', videoUrls[currentVideo]);
    };

    const handleVideoWaiting = () => {
        console.warn('Видео ожидает загрузки данных:', videoUrls[currentVideo]);
    };

    const currentVideoUrl = videoUrls[currentVideo];

    return (
        <div className={styles.container}>
            {videoUrls.length > 1 && (
                <button
                    className={styles.button_left}
                    onClick={prevSlide}
                    aria-label="Предыдущее видео"
                >
                    ‹
                </button>
            )}
            <div className={styles.videoWrapper}>
                {currentVideoUrl ? (
                    <>
                        <video
                            ref={videoRef}
                            key={currentVideoUrl}
                            className={styles.video}
                            controls
                            preload="auto"
                            onError={handleVideoError}
                            onLoadStart={handleVideoLoadStart}
                            onCanPlay={handleVideoCanPlay}
                            onLoadedMetadata={handleVideoLoadedMetadata}
                            onStalled={handleVideoStalled}
                            onWaiting={handleVideoWaiting}
                            playsInline
                        >
                            <source src={currentVideoUrl} type="video/mp4" />
                            <source src={currentVideoUrl} type="video/webm" />
                            Ваш браузер не поддерживает видео тег.
                        </video>
                        {videoError && (
                            <div className={styles.errorMessage}>
                                {videoError}
                                <br />
                                <small>URL: {currentVideoUrl}</small>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.noVideo}>
                        Видео не найдено
                    </div>
                )}
                {videoUrls.length > 1 && (
                    <div className={styles.counter}>
                        {currentVideo + 1} / {videoUrls.length}
                    </div>
                )}
            </div>
            {videoUrls.length > 1 && (
                <button
                    className={styles.button_right}
                    onClick={nextSlide}
                    aria-label="Следующее видео"
                >
                    ›
                </button>
            )}
        </div>
    )
}

export default VideosComponent