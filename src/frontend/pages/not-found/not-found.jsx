import styles from './not-found.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

function NotFound404() {

    const navigate = useNavigate();
    const canonicalUrl = ``;

    return (
        <>
            <Helmet>
                <title>{`Компания ПРИНТРИДЖ. Страница не найдена`}</title>
                <meta name="title" content={`Компания ПРИНТРИДЖ. 404 Not Found`} />
                <meta
                    name="keywords"
                    content={`заправка картриджей, заправить картридж, ремонт картриджей, ремонт оргтехники, создание сайтов,
                    ремонт принтеров, ремонт мфу, ремонт ноутбуков, установка операционных систем Windows, Linux, удаление вирусов, в Санкт-Петербурге, Санкт-Петербург`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`404 Not Found, Страница не найдена`}
                />
            </Helmet>
            <div className={styles.container}>
                <div className={styles.info_box}>
                    <h1 className={styles.title}>404 - Страница не найдена</h1>
                </div>
                <Link className={styles.button} to='/'>Вернуться на главную</Link>
                <Link className={styles.button} onClick={() => { navigate(-1) }}>Вернуться назад</Link>
            </div>
            <Navigate to="/404" replace />
        </>
    );
}

export default NotFound404;