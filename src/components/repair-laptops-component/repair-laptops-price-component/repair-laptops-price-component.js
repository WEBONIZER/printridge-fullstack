import styles from './repair-laptops-price-component.module.css'
import { useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";

const RepairPriceComponent = ({ data }) => {

    const location = useLocation();
    const canonicalUrl = `https://printridge.com${location.pathname}`;

    const { vendor, model } = useParams()

    useEffect(() => {
        document.querySelector('link[rel="canonical"]').setAttribute('href', canonicalUrl);
        document.title = `Ремонт ноутбуков ${vendor.toUpperCase()} ${model.toUpperCase()} в Санкт-Петербурге`;
        document.querySelector('meta[name="title"]').setAttribute('content', `Ремонт ноутбуков ${vendor.toUpperCase()} ${model.toUpperCase()} в Санкт-Петербурге`);
        document.querySelector('meta[name="description"]').setAttribute('content', `
        Стоимость ремонта ноутбука ${vendor.toUpperCase()} ${model}
        Диагностика ${data.price.diagnostics}
        Чистка ноутбука ${data.price.TO}
        Замена термопасты ${data.price.thermalPaste}
        Установка программ ${data.price.installPO}
        Удаление вирусов ${data.price.antivirus}
        Замена матрицы ${data.price.matrixReplacement}
        `);        
    }, [vendor, model]);

    return (
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
    )
}

export default RepairPriceComponent