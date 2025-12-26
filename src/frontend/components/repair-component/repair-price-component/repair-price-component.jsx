import styles from './repair-price-component.module.css'
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const RepairPriceComponent = ({ priceTemplate, printer }) => {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;
    const { vendor, model } = useParams();

    if (!priceTemplate) return null;

    const img = printer?.photo?.src || `https://storage.yandexcloud.net/printridge/repair/${vendor}/${model}.png`;
    const deviceText = printer?.device === 'printer' ? 'принтера' : printer?.device === 'MFU' ? 'МФУ' : 'устройства';

    const schemaData = {
        "@context": "https://schema.org/",
        "@type": "Service",
        "serviceType": [
            {
                "@language": "en",
                "@value": "Printer Repair"
            },
            {
                "@language": "ru",
                "@value": "Ремонт принтеров"
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
            "name": `Ремонт ${deviceText} ${vendor?.toUpperCase()} ${model?.toUpperCase()}`,
            "image": `${img}`,
            "description": `Ремонт ${deviceText} ${model?.toUpperCase()}`,
            "offers": {
                "@type": "Offer",
                "priceCurrency": "RUB",
                "price": priceTemplate.diagnostics || 0,
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
                <title>{`Ремонт ${vendor?.toUpperCase()} ${model?.toUpperCase()} в Санкт-Петербурге`}</title>
                <meta name="title" content={`Ремонт ${vendor?.toUpperCase()} ${model?.toUpperCase()} в Санкт-Петербурге`} />
                <meta
                    name="keywords"
                    content={`ремонт ${model?.toUpperCase()}, ремонт ${deviceText} ${vendor?.toUpperCase()} ${model?.toUpperCase()}, техническое обслуживание ${deviceText} ${vendor?.toUpperCase()} ${model?.toUpperCase()}, в Санкт-Петербурге, в спб, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`ремонт ${vendor?.toUpperCase()} ${model?.toUpperCase()}
                    Стоимость ремонта ${deviceText} ${vendor?.toUpperCase()} ${model}
                    Диагностика ${priceTemplate.diagnostics || 0}
                    ТО ${priceTemplate.TO || 0}
                    Замена роликов ${priceTemplate.rollers || 0}
                    Ремонт барабана ${priceTemplate.drum || 0}
                    Ремонт термоблока (печки) ${priceTemplate.therm || 0}
                    Ремонт электроники ${priceTemplate.electronics || 0}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`Ремонт ${deviceText} ${model?.toUpperCase()} в Санкт-Петербурге`} />
                <meta property="og:description" content={`Стоимость ремонта ${deviceText} ${vendor?.toUpperCase()} ${model}`} />
                <meta property="og:image" content={img} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div className={styles.container}>
                <h3 className={styles.boxes_title}>Цены</h3>
                <div className={styles.price_wrap_box}>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Диагностика</p>
                        <p className={styles.price}>{priceTemplate.diagnostics || 0}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>ТО</p>
                        <p className={styles.price}>{priceTemplate.TO || 0}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Замена роликов</p>
                        <p className={styles.price}>{priceTemplate.rollers || 0}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Ремонт барабана</p>
                        <p className={styles.price}>{priceTemplate.drum || 0}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Ремонт термоблока (печки)</p>
                        <p className={styles.price}>{priceTemplate.therm || 0}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Ремонт дуплекса</p>
                        <p className={styles.price}>{priceTemplate.duplex || 0}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Ремонт редуктора</p>
                        <p className={styles.price}>{priceTemplate.reducer || 0}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Ремонт лазера</p>
                        <p className={styles.price}>{priceTemplate.laser || 0}</p>
                    </div>
                    <div className={styles.text_box}>
                        <p className={styles.text}>Ремонт электроники</p>
                        <p className={styles.price}>{priceTemplate.electronics || 0}</p>
                    </div>
                    {priceTemplate.scaner !== undefined && priceTemplate.scaner !== null && (
                        <div className={styles.text_box}>
                            <p className={styles.text}>Ремонт сканера</p>
                            <p className={styles.price}>{priceTemplate.scaner}</p>
                        </div>
                    )}
                    {priceTemplate.adf !== undefined && priceTemplate.adf !== null && (
                        <div className={styles.text_box}>
                            <p className={styles.text}>Ремонт автоподатчика (ADF)</p>
                            <p className={styles.price}>{priceTemplate.adf}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default RepairPriceComponent