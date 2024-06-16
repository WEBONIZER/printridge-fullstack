import styles from './contacts-component.module.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

const ContactsComponent = () => {

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
            "name": `Принтридж. Контакты`,
            "image": `${img}`,
            "description": `Контакты. Заправка картриджей, ремонт принтеров и мфу, ремонт ноутбуков`,
            "offers": {
                "@type": "Offer",
                "priceCurrency": "RUB",
                "price": "500",
                "url": `${canonicalUrl}`
            }
        }
    }
//console.log(schemaData)
    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
                <title>{`Компания ПРИНТРИДЖ, контакты`}</title>
                <meta name="title" content={`Компания ПРИНТРИДЖ, контакты`} />
                <meta
                    name="keywords"
                    content={`ремонт ноутбуков контакты, заправка картриджей контакты, ремонт принтеров контакты, ремонт мфу контакты, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`Информация о местонахождении и времени работы компании ПРИНТРИДЖ, контактные данные`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`Компания ПРИНТРИДЖ, контакты`} />
                <meta property="og:description" content={`Информация о местонахождении и времени работы компании ПРИНТРИДЖ, контактные данные`} />
                <meta property="og:image" content={<img
                    className={styles.image}
                    src={img}
                    alt={`ПРИНТРИДЖ, контакты`}
                />} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div className={styles.container}>
                <div className={styles.info_contacts}>
                    <Link
                        className={styles.info_row}
                        to={`yandexnavi://search?text='Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж'`}
                    >
                        <div className={styles.info_row_img_location} />
                        <p className={styles.info_row_text}>Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж</p>
                    </Link>
                    <Link
                        className={styles.info_row}
                        to={`tel:+79944390149`}
                    >
                        <div className={styles.info_row_img_call} />
                        <p className={styles.info_row_text}>+7 994 439-01-49</p>
                    </Link>
                    <Link
                        className={styles.info_row}
                        to={`mailto:sales@printridge.ru`}
                    >
                        <div className={styles.info_row_img_earth} />
                        <p className={styles.info_row_text}>sales@printridge.ru</p>
                    </Link>
                    <Link
                        className={styles.info_row}
                        to="https://vk.com/printridgespb"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className={styles.info_row_img_vk} />
                        <p className={styles.info_row_text}>VK</p>
                    </Link>
                    <Link
                        className={styles.info_row}
                        to="https://t.me/DenFoxPrint"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className={styles.info_row_img_telegram} />
                        <p className={styles.info_row_text}>@DenFoxPrint</p>
                    </Link>
                </div>
                <div className={styles.map_box}>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A9944aa2dee5eddb4431580638a8ce5bef6321cc7a9bd5590e12a215b48248c7f&amp;source=constructor"
                        width="100%"
                        height="720"
                        frameborder="0">
                    </iframe>
                </div>
            </div>
        </>
    )
}

export default ContactsComponent