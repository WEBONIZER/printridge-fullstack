import styles from './repair-laptops-price-component.module.css'
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const RepairPriceComponent = ({ data }) => {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    const { vendor, model } = useParams()

    return (
        <>
            <Helmet>
                <title>{`Ремонт ноутбуков ${vendor.toUpperCase()} ${model.toUpperCase()} в Санкт-Петербурге`}</title>
                <meta name="title" content={`Ремонт ноутбуков ${vendor.toUpperCase()} ${model.toUpperCase()} в Санкт-Петербурге`} />
                <meta
                    name="keywords"
                    content={`ремонт ноутбука ${vendor.toUpperCase()} ${model.toUpperCase()}, чистка ноутбука ${vendor.toUpperCase()} ${model.toUpperCase()}, удаление вирусов, установка windows, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`Стоимость ремонта ноутбука ${vendor.toUpperCase()} ${model}
                    Диагностика ${data.price.diagnostics}
                    Чистка ноутбука ${data.price.TO}
                    Замена термопасты ${data.price.thermalPaste}
                    Установка программ ${data.price.installPO}
                    Удаление вирусов ${data.price.antivirus}
                    Замена матрицы ${data.price.matrixReplacement}`}
                />
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