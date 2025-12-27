import styles from './main.module.css'
import { MainPageDescriptionBox } from '../../components/main-page-description-box/main-page-description-box'
import { mainDescriptionBoxes } from '../../utils/main-description-boxes'
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { FC } from 'react';

export const Main: FC = () => {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    const img = `https://storage.yandexcloud.net/printridge/logo_no_back_color_invert.png`;

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
            "name": `Принтридж. Главная страница`,
            "image": `${img}`,
            "description": `Заправка картриджей, ремонт принтеров и мфу, ремонт ноутбуков`,
            "offers": {
                "@type": "Offer",
                "priceCurrency": "RUB",
                "price": "500",
                "url": `${canonicalUrl}`
            }
        }
    }

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
                <title>{`ПРИНТРИДЖ - ремонт оргтехники в Санкт-Петербурге`}</title>
                <meta name="title" content={`ПРИНТРИДЖ - ремонт оргтехники в Санкт-Петербурге`} />
                <meta
                    name="keywords"
                    content={`заправка картриджей, заправить картридж, ремонт картриджей, ремонт оргтехники, создание сайтов,
                    ремонт принтеров, ремонт мфу, ремонт ноутбуков, установка операционных систем Windows, Linux, удаление вирусов, в Санкт-Петербурге, Санкт-Петербург`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`Главная страница сайта компании ПРИНТРИДЖ. Заправка картриджей, ремонт принтеров и мфу, ремонт ноутбуков в Санкт-Петербурге`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`ПРИНТРИДЖ - ремонт оргтехники в Санкт-Петербурге`} />
                <meta property="og:description" content={`Главная страница сайта компании ПРИНТРИДЖ. Заправка картриджей, ремонт принтеров и мфу, ремонт ноутбуков в Санкт-Петербурге`} />
                <meta property="og:image" content={img} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div className={styles.main_box}>
                {mainDescriptionBoxes.map((i, key) => (
                    <MainPageDescriptionBox title={i.title} description={i.description} name={i.name} key={key} />
                ))}
            </div>
        </>
    );
}

