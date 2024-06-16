import styles from './repair-laptops-price-component.module.css'
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const RepairPriceComponent = ({ data }) => {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    const { vendor, model } = useParams()

    const img = `https://storage.yandexcloud.net/printridge/laptops/${vendor}/${model}.png`;

    const schemaData = {
        "@context": "https://schema.org/",
        "@type": "Service",
        "serviceType": [
            {
                "@language": "en",
                "@value": "Laptop Repair"
            },
            {
                "@language": "ru",
                "@value": "Ремонт ноутбуков"
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
            "name": `Ремонт ноутбука ${vendor.toUpperCase()} ${model.toUpperCase()}`,
            "image": `${img}`,
            "description": `Ремонт ноутбука ${model.toUpperCase()}`,
            "offers": {
                "@type": "Offer",
                "priceCurrency": "RUB",
                "price": data.price.TO,
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
                <title>{`Ремонт ноутбука ${vendor.toUpperCase()} ${model.toUpperCase()}`}</title>
                <meta name="title" content={`Ремонт ноутбука ${vendor.toUpperCase()} ${model.toUpperCase()}`} />
                <meta
                    name="keywords"
                    content={`ремонт ноутбука ${model.toUpperCase()}, чистка ноутбука ${vendor.toUpperCase()} ${model.toUpperCase()}, удаление вирусов, установка windows, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`ремонт ноутбука ${model.toUpperCase()}, стоимость.
                    Диагностика ${data.price.diagnostics}
                    Чистка ноутбука ${data.price.TO}
                    Замена термопасты ${data.price.thermalPaste}
                    Установка программ ${data.price.installPO}
                    Удаление вирусов ${data.price.antivirus}
                    Замена матрицы ${data.price.matrixReplacement}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`Ремонт ноутбука ${model.toUpperCase()}`} />
                <meta property="og:description" content={`Стоимость ремонта ноутбука ${vendor.toUpperCase()} ${model}`} />
                <meta property="og:image" content={<img
                    className={styles.image}
                    src={img}
                    alt={`Ремонт ноутбука ${model}`}
                />} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div className={styles.container}>
                <p className={styles.boxes_title}>Цены</p>
                <div className={styles.price_wrap_box}>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Диагностика</p>
                        <p className={styles.price}>{data.price.diagnostics}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Чистка ноутбука</p>
                        <p className={styles.price}>{data.price.TO}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Замена термопасты</p>
                        <p className={styles.price}>{data.price.thermalPaste}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Установка ОС (Windows)</p>
                        <p className={styles.price}>{data.price.installOS}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Установка программ</p>
                        <p className={styles.price}>{data.price.installPO}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Удаление вирусов</p>
                        <p className={styles.price}>{data.price.antivirus}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Замена матрицы</p>
                        <p className={styles.price}>{data.price.matrixReplacement}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Замена батареи</p>
                        <p className={styles.price}>{data.price.batteryReplacement}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Замена оперативки</p>
                        <p className={styles.price}>{data.price.ramReplacement}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Ремонт электроники</p>
                        <p className={styles.price}>{data.price.electronics}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RepairPriceComponent