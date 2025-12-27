import styles from './blog-page.module.css'
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getPaginatedExamples, getExamplePhotos, getCartridgeById, getPrinterById, getLaptopById, getPaginatedCartridges, getPaginatedPrinters, getPaginatedLaptops, Example, Cartridge, Printer, Laptop } from '../../utils/api';
import { Spinner } from '../../components/spinner/spinner';

export const BlogsPage = () => {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;
    const img = `https://storage.yandexcloud.net/printridge/logo_no_back_color_invert.png`;

    const [examples, setExamples] = useState<Example[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValue, setFilterValue] = useState('');
    const [filterDebounce, setFilterDebounce] = useState('');
    const [examplesWithPhotos, setExamplesWithPhotos] = useState<Array<Example & { randomPhoto?: string }>>([]);
    const [relatedDevices, setRelatedDevices] = useState<Record<string, Array<{ type: 'cartridge' | 'printer' | 'laptop'; name: string; url: string }>>>({});
    const limit = 20;
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilterDebounce(filterValue);
        }, 300);

        return () => clearTimeout(timer);
    }, [filterValue]);

    useEffect(() => {
        loadExamples(true);
    }, [filterDebounce]);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadExamples(false);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px'
            }
        );

        if (lastItemRef.current) {
            observerRef.current.observe(lastItemRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, isLoading, examples.length]);

    const loadExamples = async (reset = false) => {
        if (reset) {
            setExamples([]);
            setCurrentPage(1);
            setIsLoading(true);
            if (isInitialLoad) {
                setIsInitialLoad(false);
            }
        } else {
            setIsLoading(true);
        }

        try {
            const pageToLoad = reset ? 1 : currentPage;
            const response = await getPaginatedExamples({
                page: pageToLoad,
                limit,
                public: 'true',
                title: filterDebounce.trim() || undefined
            });

            const filteredData = response.data.filter(example =>
                example.public !== false &&
                (!filterDebounce.trim() ||
                    example.title?.toLowerCase().includes(filterDebounce.toLowerCase()) ||
                    example.text?.toLowerCase().includes(filterDebounce.toLowerCase()))
            );

            if (reset) {
                setExamples(filteredData);
            } else {
                setExamples(prev => [...prev, ...filteredData]);
            }

            setHasMore(response.data.length === limit && response.pagination.currentPage < response.pagination.totalPages);
            if (!reset) {
                setCurrentPage(prev => prev + 1);
            } else {
                setCurrentPage(2);
            }

            await loadPhotosForExamples(filteredData);
            await loadRelatedDevices(filteredData);
        } catch (error) {
            console.error('Ошибка загрузки блогов:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadPhotosForExamples = async (examplesToLoad: Example[]) => {
        try {
            const examplesWithPhotosData = await Promise.all(
                examplesToLoad.map(async (example) => {
                    try {
                        const photosRes = await getExamplePhotos(example._id);
                        const photos = photosRes?.data || [];
                        const randomPhoto = photos.length > 0
                            ? photos[Math.floor(Math.random() * photos.length)]?.src
                            : undefined;
                        return { ...example, randomPhoto };
                    } catch (error) {
                        return { ...example, randomPhoto: undefined };
                    }
                })
            );

            if (filterDebounce) {
                setExamplesWithPhotos(examplesWithPhotosData);
            } else {
                setExamplesWithPhotos(prev => [...prev, ...examplesWithPhotosData]);
            }
        } catch (error) {
            console.error('Ошибка загрузки фотографий:', error);
        }
    };

    const loadRelatedDevices = async (examplesToLoad: Example[]) => {
        try {
            const devicesMap: Record<string, Array<{ type: 'cartridge' | 'printer' | 'laptop'; name: string; url: string }>> = {};

            await Promise.all(
                examplesToLoad.map(async (example) => {
                    const devices: Array<{ type: 'cartridge' | 'printer' | 'laptop'; name: string; url: string }> = [];
                    const seenUrls = new Set<string>();

                    // Обработка одиночного ID картриджа
                    if (example.cartridgeId) {
                        try {
                            const cartridgeRes = await getCartridgeById(example.cartridgeId);
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
                    if (example.cartridgeNames && example.cartridgeNames.length > 0) {
                        await Promise.all(
                            example.cartridgeNames.map(async (name) => {
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
                    if (example.printerId) {
                        try {
                            const printerRes = await getPrinterById(example.printerId);
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
                    if (example.printerNames && example.printerNames.length > 0) {
                        await Promise.all(
                            example.printerNames.map(async (name) => {
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
                    if (example.laptopId) {
                        try {
                            const laptopRes = await getLaptopById(example.laptopId);
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
                    if (example.laptopNames && example.laptopNames.length > 0) {
                        await Promise.all(
                            example.laptopNames.map(async (name) => {
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

                    if (devices.length > 0) {
                        devicesMap[example._id] = devices;
                    }
                })
            );

            if (filterDebounce) {
                setRelatedDevices(devicesMap);
            } else {
                setRelatedDevices(prev => ({ ...prev, ...devicesMap }));
            }
        } catch (error) {
            console.error('Ошибка загрузки связанных устройств:', error);
        }
    };

    const truncateText = (text: string, maxLength: number = 300) => {
        if (!text) return '';
        const textWithoutHtml = text.replace(/<[^>]*>/g, '');
        if (textWithoutHtml.length <= maxLength) return textWithoutHtml;
        return textWithoutHtml.substring(0, maxLength) + '...';
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

    const schemaData = {
        "@context": "https://schema.org/",
        "@type": "Blog",
        "name": "Блог ПРИНТРИДЖ",
        "url": canonicalUrl,
        "description": "Статьи о заправке картриджей, ремонте принтеров и ноутбуков",
        "publisher": {
            "@type": "Organization",
            "name": "Принтридж",
            "url": "https://printridge.ru"
        }
    };

    if (isInitialLoad && isLoading && examples.length === 0) {
        return <Spinner />;
    }

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
                <title>Блог ПРИНТРИДЖ - Статьи о заправке картриджей и ремонте техники</title>
                <meta name="title" content="Блог ПРИНТРИДЖ - Статьи о заправке картриджей и ремонте техники" />
                <meta
                    name="keywords"
                    content="блог заправка картриджей, блог ремонт принтеров, блог ремонт ноутбуков, статьи о принтерах, статьи о картриджах, в Санкт-Петербурге"
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content="Блог компании ПРИНТРИДЖ. Полезные статьи о заправке картриджей, ремонте принтеров и ноутбуков. Советы по обслуживанию техники."
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Блог ПРИНТРИДЖ - Статьи о заправке картриджей и ремонте техники" />
                <meta property="og:description" content="Полезные статьи о заправке картриджей, ремонте принтеров и ноутбуков" />
                <meta property="og:image" content={img} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div className={styles.container}>
                <h1 className={styles.title}>Блог</h1>
                <div className={styles.filter_container}>
                    <input
                        type="text"
                        className={styles.filter_input}
                        placeholder="Поиск по статьям..."
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                </div>
                <div className={styles.blogs_list}>
                    {examples.map((example, index) => {
                        const exampleWithPhoto = examplesWithPhotos.find((e: Example & { randomPhoto?: string }) => e._id === example._id);
                        const isLastItem = index === examples.length - 1;
                        const truncatedText = truncateText(example.text);
                        const articleUrl = example.route ? `/blog/${example.route}` : `/blog/${example._id}`;
                        const randomPhoto = exampleWithPhoto?.randomPhoto;

                        return (
                            <article
                                key={example._id}
                                className={styles.blog_item}
                                ref={isLastItem ? lastItemRef : null}
                            >
                                <div className={styles.blog_content}>
                                    <h2 className={styles.blog_title}>
                                        <Link
                                            to={articleUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.blog_title_link}
                                        >
                                            {example.title}
                                        </Link>
                                    </h2>
                                    <div className={styles.blog_body}>
                                        {randomPhoto ? (
                                            <>
                                                <div className={styles.blog_image_wrapper}>
                                                    <img
                                                        src={randomPhoto}
                                                        alt={example.title}
                                                        className={styles.blog_image}
                                                    />
                                                </div>
                                                <div className={styles.blog_text_wrapper}>
                                                    <div
                                                        className={styles.blog_text}
                                                        dangerouslySetInnerHTML={{ __html: truncatedText }}
                                                    />
                                                    <Link
                                                        to={articleUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.read_more}
                                                    >
                                                        Подробнее
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <div className={styles.blog_text_full}>
                                                <div
                                                    className={styles.blog_text}
                                                    dangerouslySetInnerHTML={{ __html: truncatedText }}
                                                />
                                                <Link
                                                    to={articleUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.read_more}
                                                >
                                                    Подробнее
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    {relatedDevices[example._id] && relatedDevices[example._id].length > 0 && (
                                        <div className={styles.related_devices}>
                                            <h3 className={styles.related_devices_title}>Актуально для:</h3>
                                            <div className={styles.related_devices_list}>
                                                {relatedDevices[example._id].map((device, index) => (
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
                                    <div className={styles.blog_footer}>
                                        <time className={styles.blog_date}>
                                            {formatDate(example.createdAt)}
                                        </time>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
                {isLoading && examples.length > 0 && (
                    <div className={styles.loading}>
                        <Spinner />
                    </div>
                )}
                {!hasMore && examples.length > 0 && (
                    <div className={styles.no_more}>
                        Все статьи загружены
                    </div>
                )}
                {examples.length === 0 && !isLoading && (
                    <div className={styles.no_results}>
                        Статьи не найдены
                    </div>
                )}
            </div>
        </>
    )
}
