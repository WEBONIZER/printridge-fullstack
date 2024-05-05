import styles from './main.module.css'
import MainPageDescriptionBox from '../../components/main-page-description-box/main-page-description-box'
import { mainDescriptionBoxes } from '../../utils/main-description-boxes'
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

const Main = () => {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    return (
        <>
            <Helmet>
                <title>{`Компания ПРИНТРИДЖ. Заправка картриджей, ремонт принтеров и мфу, ремонт ноутбуков в Санкт-Петербурге`}</title>
                <meta name="title" content={`Компания ПРИНТРИДЖ. Заправка картриджей, ремонт принтеров и мфу, ремонт ноутбуков в Санкт-Петербурге`} />
                <meta
                    name="keywords"
                    content={`заправка картриджей, заправить картридж, ремонт картриджей, ремонт оргтехники, создание сайтов,
                    ремонт принтеров, ремонт мфу, ремонт ноутбуков, установка операционных систем Windows, Linux, удаление вирусов, в Санкт-Петербурге, Санкт-Петербург`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`ПРИНТРИДЖ, главная страница`}
                />
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