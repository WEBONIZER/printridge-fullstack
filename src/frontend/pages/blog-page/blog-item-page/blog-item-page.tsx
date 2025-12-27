import styles from './blog-item-page.module.css'
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useEffect, useState } from 'react';
import { getExampleByRoute, getExamplePhotos, getExampleVideos, Example } from '../../../utils/api';
import { PhotoGallery } from '../../../components/photo-gallery/photo-gallery';
import { VideosComponent } from '../../../components/media-slider/videos-component/videos-component';
import { Spinner } from '../../../components/spinner/spinner';
import { sanitizeHtml } from '../../../utils/html-sanitizer';

export const BlogItemPage = () => {

    const { itemRoute } = useParams();
    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    const [example, setExample] = useState<Example | null>(null);
    const [photos, setPhotos] = useState<Array<{ src: string; alt: string }>>([]);
    const [videos, setVideos] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const exampleResponse = await getExampleByRoute(itemRoute || '');
                if (exampleResponse.data) {
                    const exampleData = exampleResponse.data;
                    if (exampleData.public === false) {
                        setExample(null);
                        return;
                    }
                    setExample(exampleData);

                    const [photosRes, videosRes] = await Promise.all([
                        getExamplePhotos(exampleData._id),
                        getExampleVideos(exampleData._id)
                    ]);

                    const photosData = photosRes?.data || [];
                    const videosData = videosRes?.data || [];

                    setPhotos(photosData.map((photo: any) => ({
                        src: photo.src || photo.url,
                        alt: photo.alt || exampleData.title
                    })) as Array<{ src: string; alt: string }>);

                    // Нормализуем видео - преобразуем в массив строк с абсолютными URL
                    const normalizedVideos = videosData.map((video: any) => {
                        let url;
                        if (typeof video === 'string') {
                            url = video;
                        } else {
                            url = video.src || video.url;
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
                    }).filter((url: string | null): url is string => url !== null && typeof url === 'string');

                    setVideos(normalizedVideos);
                }
            } catch (error) {
                console.error('Ошибка загрузки статьи:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (itemRoute) {
            loadData();
        }
    }, [itemRoute]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (!example) {
        return (
            <div className={styles.container}>
                <div className={styles.not_found}>Статья не найдена</div>
            </div>
        );
    }

    const sanitizedText = sanitizeHtml(example.text || '');
    const ogImage = example.ogImage || (photos.length > 0 ? photos[0].src : 'https://storage.yandexcloud.net/printridge/logo_no_back_color_invert.png');
    const metaTitle = example.metaTitle || example.title;
    const metaDescription = example.metaDescription || (example.text ? example.text.replace(/<[^>]*>/g, '').substring(0, 160) : '');
    const ogTitle = example.ogTitle || example.title;
    const ogDescription = example.ogDescription || metaDescription;

    const schemaData = {
        "@context": "https://schema.org/",
        "@type": "BlogPosting",
        "headline": example.title,
        "description": metaDescription,
        "image": ogImage,
        "datePublished": example.createdAt,
        "dateModified": example.updatedAt || example.createdAt,
        "author": {
            "@type": "Organization",
            "name": "Принтридж"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Принтридж",
            "url": "https://printridge.ru",
            "logo": {
                "@type": "ImageObject",
                "url": "https://storage.yandexcloud.net/printridge/logo_no_back_color_invert.png"
            }
        }
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
                <title>{metaTitle}</title>
                <meta name="title" content={metaTitle} />
                {example.metaKeywords && (
                    <meta name="keywords" content={example.metaKeywords} />
                )}
                <link rel="canonical" href={canonicalUrl} />
                <meta name="description" content={metaDescription} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDescription} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="article:published_time" content={example.createdAt || ''} />
                {example.updatedAt && (
                    <meta property="article:modified_time" content={example.updatedAt} />
                )}
            </Helmet>
            <div className={styles.container}>
                <article className={styles.article}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>{example.title}</h1>
                        <time className={styles.date}>{formatDate(example.createdAt)}</time>
                    </header>
                    <div className={styles.content}>
                        {photos.length > 0 && (
                            <div className={styles.media_section}>
                                <h2 className={styles.media_title}>Фотографии</h2>
                                <PhotoGallery photos={photos as any} />
                            </div>
                        )}
                        <div
                            className={styles.text}
                            dangerouslySetInnerHTML={{ __html: sanitizedText }}
                        />
                        {videos.length > 0 && (
                            <div className={styles.media_section}>
                                <h2 className={styles.media_title}>Видео</h2>
                                <VideosComponent videosArr={videos as any} />
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </>
    )
}
