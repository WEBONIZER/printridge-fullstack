import styles from './main.module.css'
import MainPageDescriptionBox from '../../components/main-page-description-box/main-page-description-box'
import { mainDescriptionBoxes } from '../../utils/main-description-boxes'
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

const Main = () => {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    const img = `https://storage.yandexcloud.net/printridge/logo_no_back_color_invert.png`;

    return (
        <>
            <Helmet>
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
                <meta property="og:image" content={<img
                    className={styles.image}
                    src={img}
                    alt={`ПРИНТРИДЖ, главная страница`}
                />} />
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

export default Main;