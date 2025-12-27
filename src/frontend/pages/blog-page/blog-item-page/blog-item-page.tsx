import styles from './blog-item-page.module.css'
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExampleByRoute, getExamplePhotos, getExampleVideos, getCartridgeById, getPrinterById, getLaptopById, getPaginatedCartridges, getPaginatedPrinters, getPaginatedLaptops, Example } from '../../../utils/api';
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
    const [relatedDevices, setRelatedDevices] = useState<Array<{ type: 'cartridge' | 'printer' | 'laptop'; name: string; url: string }>>([]);
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

                    await loadRelatedDevices(exampleData);
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

    const loadRelatedDevices = async (exampleData: Example) => {
        const devices: Array<{ type: 'cartridge' | 'printer' | 'laptop'; name: string; url: string }> = [];
        const seenUrls = new Set<string>();

        // Обработка одиночного ID картриджа
        if (exampleData.cartridgeId) {
            try {
                const cartridgeRes = await getCartridgeById(exampleData.cartridgeId);
                if (cartridgeRes.data) {
                    const cartridge = cartridgeRes.data;
                    const vendorUrl = (cartridge.vendor || '').toLowerCase();
                    const modelUrl = (cartridge.modelCart || '').replace(/\s/g, '');
                    const url = `/refill/${vendorUrl}/${modelUrl}`;
                    if (!seenUrls.has(url)) {
                        seenUrls.add(url);
                        devices.push({
                            type: 'cartridge',
                            name: cartridge.modelCart || '',
                            url
                        });
                    }
                }
            } catch (error) {
                console.error('Ошибка загрузки картриджа:', error);
            }
        }

        // Обработка массива названий картриджей
        if (exampleData.cartridgeNames && exampleData.cartridgeNames.length > 0) {
            await Promise.all(
                exampleData.cartridgeNames.map(async (name) => {
                    try {
                        const response = await getPaginatedCartridges({
                            page: 1,
                            limit: 1,
                            modelCart: name,
                            public: 'true'
                        });
                        if (response.data && response.data.length > 0) {
                            const cartridge = response.data[0];
                            const vendorUrl = (cartridge.vendor || '').toLowerCase();
                            const modelUrl = (cartridge.modelCart || '').replace(/\s/g, '');
                            const url = `/refill/${vendorUrl}/${modelUrl}`;
                            if (!seenUrls.has(url)) {
                                seenUrls.add(url);
                                devices.push({
                                    type: 'cartridge',
                                    name: cartridge.modelCart || name,
                                    url
                                });
                            }
                        }
                    } catch (error) {
                        console.error('Ошибка загрузки картриджа по названию:', error);
                    }
                })
            );
        }

        // Обработка одиночного ID принтера
        if (exampleData.printerId) {
            try {
                const printerRes = await getPrinterById(exampleData.printerId);
                if (printerRes.data) {
                    const printer = printerRes.data;
                    const vendorUrl = (printer.vendor || '').toLowerCase();
                    const modelUrl = (printer.model || '').replace(/\s/g, '');
                    const url = `/repair/${vendorUrl}/${modelUrl}`;
                    if (!seenUrls.has(url)) {
                        seenUrls.add(url);
                        devices.push({
                            type: 'printer',
                            name: printer.model || '',
                            url
                        });
                    }
                }
            } catch (error) {
                console.error('Ошибка загрузки принтера:', error);
            }
        }

        // Обработка массива названий принтеров
        if (exampleData.printerNames && exampleData.printerNames.length > 0) {
            await Promise.all(
                exampleData.printerNames.map(async (name) => {
                    try {
                        const response = await getPaginatedPrinters({
                            page: 1,
                            limit: 1,
                            model: name,
                            public: 'true'
                        });
                        if (response.data && response.data.length > 0) {
                            const printer = response.data[0];
                            const vendorUrl = (printer.vendor || '').toLowerCase();
                            const modelUrl = (printer.model || '').replace(/\s/g, '');
                            const url = `/repair/${vendorUrl}/${modelUrl}`;
                            if (!seenUrls.has(url)) {
                                seenUrls.add(url);
                                devices.push({
                                    type: 'printer',
                                    name: printer.model || name,
                                    url
                                });
                            }
                        }
                    } catch (error) {
                        console.error('Ошибка загрузки принтера по названию:', error);
                    }
                })
            );
        }

        // Обработка одиночного ID ноутбука
        if (exampleData.laptopId) {
            try {
                const laptopRes = await getLaptopById(exampleData.laptopId);
                if (laptopRes.data) {
                    const laptop = laptopRes.data;
                    const vendorUrl = (laptop.vendor || '').toLowerCase();
                    const modelUrl = (laptop.model || '').replace(/\s/g, '');
                    const url = `/remont-noutbukov/${vendorUrl}/${modelUrl}`;
                    if (!seenUrls.has(url)) {
                        seenUrls.add(url);
                        devices.push({
                            type: 'laptop',
                            name: laptop.model || '',
                            url
                        });
                    }
                }
            } catch (error) {
                console.error('Ошибка загрузки ноутбука:', error);
            }
        }

        // Обработка массива названий ноутбуков
        if (exampleData.laptopNames && exampleData.laptopNames.length > 0) {
            await Promise.all(
                exampleData.laptopNames.map(async (name) => {
                    try {
                        const response = await getPaginatedLaptops({
                            page: 1,
                            limit: 1,
                            model: name,
                            public: 'true'
                        });
                        if (response.data && response.data.length > 0) {
                            const laptop = response.data[0];
                            const vendorUrl = (laptop.vendor || '').toLowerCase();
                            const modelUrl = (laptop.model || '').replace(/\s/g, '');
                            const url = `/remont-noutbukov/${vendorUrl}/${modelUrl}`;
                            if (!seenUrls.has(url)) {
                                seenUrls.add(url);
                                devices.push({
                                    type: 'laptop',
                                    name: laptop.model || name,
                                    url
                                });
                            }
                        }
                    } catch (error) {
                        console.error('Ошибка загрузки ноутбука по названию:', error);
                    }
                })
            );
        }

        setRelatedDevices(devices);
    };

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
                        {relatedDevices.length > 0 && (
                            <div className={styles.related_devices}>
                                <h2 className={styles.related_devices_title}>Актуально для:</h2>
                                <div className={styles.related_devices_list}>
                                    {relatedDevices.map((device, index) => (
                                        <Link
                                            key={index}
                                            to={device.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.related_device_link}
                                        >
                                            {device.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </>
    )
}
