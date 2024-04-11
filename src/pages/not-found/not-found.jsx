import styles from './not-found.module.css'
import { Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function NotFound404() {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    useEffect(() => {
        document.querySelector('link[rel="canonical"]').setAttribute('href', canonicalUrl);
        document.title = "Компания ПРИНТРИДЖ. Страница не найдена";
        document.querySelector('meta[name="title"]').setAttribute('content', `Компания ПРИНТРИДЖ. 404 Not Found`);
        document.querySelector('meta[name="description"]').setAttribute('content', `404 Not Found, Страница не найдена`);
        document.querySelector('meta[name="keywords"]').setAttribute('content', `заправка картриджей, заправить картридж, ремонт картриджей, ремонт оргтехники, создание сайтов,
        ремонт принтеров, ремонт мфу, ремонт ноутбуков, установка операционных систем Windows, Linux, удаление вирусов, в Санкт-Петербурге, Санкт-Петербург`);
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.info_box}>
                    <h2 className={styles.title}>404 - Страница не найдена</h2>
                </div>
                <Link className={styles.button} to='/'>Вернуться на главную</Link>
            </div>
            <Navigate to="/404" replace />
        </>
    );
}

export default NotFound404;