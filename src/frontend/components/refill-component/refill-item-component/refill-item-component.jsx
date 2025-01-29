import styles from './refill-item-component.module.css'
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { refillData } from '../../../utils/refill';
import Tabs from '../../tabs/tabs';
import ImageBox from './image-box/image-box'
import DescriptionBox from './description-box/description-box'
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

function RefillItemComponent() {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    const { vendor, model } = useParams()
    const data = refillData.find((i) => i.modelCart === model)

    const img = `https://storage.yandexcloud.net/printridge/refill/${vendor}/${model}.png`;

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
            "description": `Заправка картриджа ${data.modelCart} - ${data.refill_price} Восстановление ${data.modelCart} - ${data.recovery_price}`,
            "offers": {
                "@type": "Offer",
                "priceCurrency": "RUB",
                "price": data.refill_price,
                "url": `${canonicalUrl}`,
                "priceValidUntil": new Date().toLocaleDateString(),
                "availability": "https://schema.org/InStock"
            }
        }
    }
    //console.log(schemaData)
    return (data &&
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
                <title>{`Заправка ${model.toUpperCase()} в Санкт-Петербурге`}</title>
                <meta name="title" content={`Заправка ${model.toUpperCase()} в Санкт-Петербурге`} />
                <meta
                    name="keywords"
                    content={`заправка картриджа ${vendor.toUpperCase()} ${model.toUpperCase()}, заправить картридж ${vendor.toUpperCase()} ${model.toUpperCase()}, для ${data.devices}, восстановление картриджа ${vendor.toUpperCase()} ${model.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`заправка ${model.toUpperCase()}, заправка картриджа ${data.modelCart} - ${data.refill_price} Восстановление ${data.modelCart} ${data.recovery_price}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`Заправка картриджа ${vendor.toUpperCase()} ${model.toUpperCase()}`} />
                <meta property="og:description" content={`Стоимость заправки ${data.modelCart} - ${data.refill_price}, стоимость восстановления ${data.modelCart} ${data.recovery_price}`} />
                <meta property="og:image" content={img} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div>
                <div className={styles.container}>
                    <h1 className={styles.name}>Заправка {`${data.modelCart}`}</h1>
                    <div className={styles.img_desc_box}>
                        <div className={styles.left_box}>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Совместимые модели</p>
                                <p className={styles.black_text}>{data.devices}</p>
                            </div>
                            {data.resource !== undefined ? <div className={styles.text_box}>
                                <p className={styles.blue_text}>Ресурс картриджа:</p>
                                <p className={styles.black_text}>{`${data.resource} стр., при заполнении страницы 5%`}</p>
                            </div> : ''}

                            <p className={styles.boxes_title}>Цены</p>
                            <div className={styles.text_box}>
                                <h3 className={styles.blue_text}>{`Заправка ${data.modelCart}`}</h3>
                                <p className={styles.black_text}>{parseInt(data.refill_price, 10)}</p>
                            </div>
                            <div className={styles.text_box}>
                                <h3 className={styles.blue_text}>{`Восстановление ${data.modelCart}`}</h3>
                                <p className={styles.black_text}>{parseInt(data.recovery_price, 10)}</p>
                            </div>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Замена чипа</p>
                                <p className={styles.black_text}>{data.chip ? 'уточняйте' : 'не требуется'}</p>
                            </div>
                        </div>
                        <ImageBox />
                        <h2 className={styles.name_mobile}>Заправка {`${data.modelCart}`}</h2>
                    </div>
                    <DescriptionBox />
                </div>
                {data.examples.length !== 0 && <Tabs items={data.examples} />}
            </div>
        </>
    );
}

export default RefillItemComponent;