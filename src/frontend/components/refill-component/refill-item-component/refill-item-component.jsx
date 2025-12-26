import styles from './refill-item-component.module.css'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '../../tabs/tabs';
import ImageBox from './image-box/image-box'
import DescriptionBox from './description-box/description-box'
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { getPaginatedCartridges, getPrintersByCartridgeId, getPaginatedExamples } from '../../../utils/api';
import Spinner from '../../spinner/spinner';

function RefillItemComponent() {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    const { vendor, model } = useParams()
    const [cartridge, setCartridge] = useState(null);
    const [printers, setPrinters] = useState([]);
    const [examples, setExamples] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const cartridgesResponse = await getPaginatedCartridges({
                    page: 1,
                    limit: 1,
                    vendor: vendor || undefined,
                    modelCart: model || undefined,
                    public: 'true'
                });

                if (cartridgesResponse.data && cartridgesResponse.data.length > 0) {
                    const foundCartridge = cartridgesResponse.data.find(c => c.public !== false);
                    if (foundCartridge) {
                        setCartridge(foundCartridge);

                    const [printersResponse, examplesResponse] = await Promise.all([
                        getPrintersByCartridgeId(foundCartridge._id),
                        getPaginatedExamples({
                            page: 1,
                            limit: 100,
                            cartridgeId: foundCartridge._id,
                            public: 'true'
                        })
                    ]);

                    setPrinters(printersResponse.data || []);
                    const filteredExamples = (examplesResponse.data || []).filter(example => example.public !== false);
                    setExamples(filteredExamples);
                    }
                }
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [vendor, model]);

    if (isLoading) {
        return <Spinner />;
    }

    if (!cartridge) return null;

    const img = cartridge.photo?.src || `https://storage.yandexcloud.net/printridge/refill/${vendor}/${model}.png`;
    const devicesString = printers.map(p => p.model || '').filter(m => m).join(', ');

    const schemaData = {
        "@context": "https://schema.org/",
        "@type": "Service",
        "serviceType": [
            {
                "@language": "en",
                "@value": "Cartridge Refill"
            },
            {
                "@language": "ru",
                "@value": "Заправка картриджей"
            }
        ],
        "provider": {
            "@type": "Organization",
            "name": "Принтридж",
            "url": "https://printridge.ru",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Тамбовская улица, 32, оф. 508, 5-й этаж",
                "addressLocality": "Санкт-Петербург",
                "addressRegion": "СПб",
                "postalCode": "192007",
                "addressCountry": "RU"
            }
        },
        "areaServed": {
            "@type": "Place",
            "name": "Санкт-Петербург"
        },
        "serviceOutput": {
            "@type": "Product",
            "name": `Заправка картриджа ${vendor.toUpperCase()} ${model.toUpperCase()}`,
            "image": `${img}`,
            "description": `Заправка картриджа ${cartridge.modelCart} - ${cartridge.refill_price} Восстановление ${cartridge.modelCart} - ${cartridge.recovery_price}`,
            "offers": {
                "@type": "Offer",
                "priceCurrency": "RUB",
                "price": cartridge.refill_price,
                "url": `${canonicalUrl}`,
                "priceValidUntil": new Date().toLocaleDateString(),
                "availability": "https://schema.org/InStock"
            }
        }
    }

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
                <title>{`Заправка ${model.toUpperCase()} в Санкт-Петербурге`}</title>
                <meta name="title" content={`Заправка ${model.toUpperCase()} в Санкт-Петербурге`} />
                <meta
                    name="keywords"
                    content={`заправка картриджа ${vendor.toUpperCase()} ${model.toUpperCase()}, заправить картридж ${vendor.toUpperCase()} ${model.toUpperCase()}, для ${devicesString}, восстановление картриджа ${vendor.toUpperCase()} ${model.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`заправка ${model.toUpperCase()}, заправка картриджа ${cartridge.modelCart} - ${cartridge.refill_price} Восстановление ${cartridge.modelCart} ${cartridge.recovery_price}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`Заправка картриджа ${vendor.toUpperCase()} ${model.toUpperCase()}`} />
                <meta property="og:description" content={`Стоимость заправки ${cartridge.modelCart} - ${cartridge.refill_price}, стоимость восстановления ${cartridge.modelCart} ${cartridge.recovery_price}`} />
                <meta property="og:image" content={img} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div>
                <div className={styles.container}>
                    <h1 className={styles.name}>Заправка {`${cartridge.modelCart}`}</h1>
                    <div className={styles.img_desc_box}>
                        <div className={styles.left_box}>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Совместимые модели</p>
                                <p className={styles.black_text}>
                                    {printers.length > 0 ? (
                                        printers.map((printer, index) => {
                                            if (!printer.model) return null;
                                            const modelUrl = printer.model.replace(/\s/g, '');
                                            const vendorUrl = (printer.vendor || cartridge.vendor || '').toLowerCase();
                                            return (
                                                <span key={printer._id || index}>
                                                    {index > 0 && ' / '}
                                                    <Link
                                                        to={`/repair/${vendorUrl}/${modelUrl}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ 
                                                            color: 'inherit', 
                                                            textDecoration: 'underline',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        {printer.model}
                                                    </Link>
                                                </span>
                                            );
                                        })
                                    ) : (
                                        'Не указано'
                                    )}
                                </p>
                            </div>
                            {cartridge.resource !== undefined ? <div className={styles.text_box}>
                                <p className={styles.blue_text}>Ресурс картриджа:</p>
                                <p className={styles.black_text}>{`${cartridge.resource} стр., при заполнении страницы 5%`}</p>
                            </div> : ''}

                            <p className={styles.boxes_title}>Цены</p>
                            <div className={styles.text_box}>
                                <h3 className={styles.blue_text}>{`Заправка ${cartridge.modelCart}`}</h3>
                                <p className={styles.black_text}>{parseInt(cartridge.refill_price, 10)}</p>
                            </div>
                            <div className={styles.text_box}>
                                <h3 className={styles.blue_text}>{`Восстановление ${cartridge.modelCart}`}</h3>
                                <p className={styles.black_text}>{parseInt(cartridge.recovery_price, 10)}</p>
                            </div>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Замена чипа</p>
                                <p className={styles.black_text}>{cartridge.chip ? 'уточняйте' : 'не требуется'}</p>
                            </div>
                        </div>
                        <ImageBox cartridge={cartridge} />
                        <h2 className={styles.name_mobile}>Заправка {`${cartridge.modelCart}`}</h2>
                    </div>
                    <DescriptionBox />
                </div>
                {examples.length !== 0 && <Tabs items={examples} />}
            </div>
        </>
    );
}

export default RefillItemComponent;