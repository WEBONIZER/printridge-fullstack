import styles from './tabs.module.css';
import { useState, useEffect, FC } from 'react';
import { TabContent } from './tab-contenet/tab-contenet';
import { sanitizeHtml } from '../../utils/html-sanitizer';
import { getExamplePhotos, getExampleVideos, Example } from '../../utils/api';

interface TabsProps {
    items: Example[];
}

interface ExampleWithMedia extends Example {
    photos: Array<{ src: string; alt?: string }>;
    videos: string[];
}

export const Tabs: FC<TabsProps> = ({ items }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeMediaType, setActiveMediaType] = useState<'photos' | 'videos'>('photos');
    const [examplesWithMedia, setExamplesWithMedia] = useState<ExampleWithMedia[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadMedia = async () => {
            setIsLoading(true);
            setActiveTab(0); // Сбрасываем активную вкладку при загрузке новых примеров
            try {
                const examplesData = await Promise.all(
                    items.map(async (example) => {
                        try {
                            const [photosRes, videosRes] = await Promise.all([
                                getExamplePhotos(example._id),
                                getExampleVideos(example._id)
                            ]);

                            // getExamplePhotos/getExampleVideos возвращают response.data
                            // который содержит { success: true, data: [...], pagination: {...} }
                            const photos = (photosRes?.data || []) as Array<{ src: string; alt?: string }>;
                            const videosData = videosRes?.data || [];
                            const videos = videosData.map((v: any) => typeof v === 'string' ? v : (v.src || v)).filter((url: any): url is string => typeof url === 'string');

                            return {
                                ...example,
                                photos: photos,
                                videos: videos
                            };
                        } catch (error) {
                            console.error(`Ошибка загрузки медиа для примера ${example._id}:`, error);
                            return {
                                ...example,
                                photos: [],
                                videos: []
                            };
                        }
                    })
                );
                setExamplesWithMedia(examplesData);
                
                // Автоматически выбираем тип медиа в зависимости от наличия
                const firstExample = examplesData[0];
                if (firstExample) {
                    if (firstExample.photos.length > 0) {
                        setActiveMediaType('photos');
                    } else if (firstExample.videos.length > 0) {
                        setActiveMediaType('videos');
                    }
                }
            } catch (error) {
                console.error('Ошибка загрузки примеров:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (items && items.length > 0) {
            loadMedia();
        } else {
            setIsLoading(false);
            setExamplesWithMedia([]);
        }
    }, [items]);

    const handleTabClick = (index: number) => {
        if (index < 0 || index >= examplesWithMedia.length) {
            return;
        }
        setActiveTab(index);
        // При смене вкладки автоматически выбираем тип медиа
        const example = examplesWithMedia[index];
        if (example) {
            if (example.photos && example.photos.length > 0) {
                setActiveMediaType('photos');
            } else if (example.videos && example.videos.length > 0) {
                setActiveMediaType('videos');
            }
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (!examplesWithMedia || examplesWithMedia.length === 0) {
        return null;
    }

    const currentExample = examplesWithMedia[activeTab];
    const hasPhotos = currentExample?.photos?.length > 0;
    const hasVideos = currentExample?.videos?.length > 0;

    return (
        <div className={styles.box}>
            <h2 className={styles.title}>Примеры нашей работы</h2>
            
            {/* Вкладки примеров */}
            <div className={styles.tabs}>
                {examplesWithMedia.map((example, index) => (
                    <button
                        key={example._id || index}
                        type="button"
                        className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleTabClick(index);
                        }}
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(example.title || '') }}
                    />
                ))}
            </div>

            {/* Контент вкладки */}
            {currentExample && (
                <TabContent
                    {...currentExample}
                    activeMediaType={activeMediaType}
                    onMediaTypeChange={setActiveMediaType}
                    hasPhotos={hasPhotos}
                    hasVideos={hasVideos}
                />
            )}
        </div>
    );
}

