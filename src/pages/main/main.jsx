import styles from './main.module.css'
import MainPageDescriptionBox from '../../components/main-page-description-box/main-page-description-box'
import { mainDescriptionBoxes } from '../../utils/main-description-boxes'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Main = () => {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    useEffect(() => {
        document.querySelector('link[rel="canonical"]').setAttribute('href', canonicalUrl);
        document.title = "Компания ПРИНТРИДЖ. Заправка картриджей, ремонт принтеров и мфу, ремонт ноутбуков в Санкт-Петербурге";
        document.querySelector('meta[name="title"]').setAttribute('content', `Компания ПРИНТРИДЖ. Заправка картриджей, ремонт принтеров и мфу, ремонт ноутбуков в Санкт-Петербурге`);
        document.querySelector('meta[name="description"]').setAttribute('content', `ПРИНТРИДЖ, главная страница`);
        document.querySelector('meta[name="keywords"]').setAttribute('content', `заправка картриджей, заправить картридж, ремонт картриджей, ремонт оргтехники, создание сайтов,
        ремонт принтеров, ремонт мфу, ремонт ноутбуков, установка операционных систем Windows, Linux, удаление вирусов, в Санкт-Петербурге, Санкт-Петербург`);
    }, []);

    return (
        <div className={styles.main_box}>
            {mainDescriptionBoxes.map((i, key) => (
                <MainPageDescriptionBox title={i.title} description={i.description} name={i.name} key={key} />
            ))}
        </div>
    );
}

export default Main;