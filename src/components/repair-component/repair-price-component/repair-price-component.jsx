import styles from './repair-price-component.module.css'
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const RepairPriceComponent = ({ data }) => {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    const { vendor, model } = useParams()

    useEffect(() => {
        document.querySelector('link[rel="canonical"]').setAttribute('href', canonicalUrl);
        document.title = `Ремонт принтеров и МФУ ${vendor.toUpperCase()} ${model.toUpperCase()} в Санкт-Петербурге`;
        document.querySelector('meta[name="title"]').setAttribute('content', `Ремонт принтеров и МФУ ${vendor.toUpperCase()} ${model.toUpperCase()} в Санкт-Петербурге`);
        document.querySelector('meta[name="description"]').setAttribute('content', `
        Стоимость ремонта ${data.device === 'printer' ? 'принтера' : 'МФУ'} ${vendor.toUpperCase()} ${model}
        Диагностика ${data.price.diagnostics}
        ТО ${data.price.TO}
        Замена роликов ${data.price.rollers}
        Ремонт барабана ${data.price.drum}
        Ремонт термоблока (печки) ${data.price.therm}
        Ремонт электроники ${data.price.electronics}
        `);
        document.querySelector('meta[name="keywords"]').setAttribute('content', `ремонт ${data.device === 'printer' ? 'принтера' : 'МФУ'} ${vendor.toUpperCase()} ${model.toUpperCase()}, техническое обслуживание ${data.device === 'printer' ? 'принтера' : 'МФУ'} ${vendor.toUpperCase()} ${model.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`);
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
                    <p className={styles.text}>ТО</p>
                    <p className={styles.price}>{data.price.TO}</p>
                </div>
                <div className={styles.text_box}>
                    <p className={styles.text}>Замена роликов</p>
                    <p className={styles.price}>{data.price.rollers}</p>
                </div>
                <div className={styles.text_box}>
                    <p className={styles.text}>Ремонт барабана</p>
                    <p className={styles.price}>{data.price.drum}</p>
                </div>
                <div className={styles.text_box}>
                    <p className={styles.text}>Ремонт термоблока (печки)</p>
                    <p className={styles.price}>{data.price.therm}</p>
                </div>
                <div className={styles.text_box}>
                    <p className={styles.text}>Ремонт дуплекса</p>
                    <p className={styles.price}>{data.price.duplex}</p>
                </div>
                <div className={styles.text_box}>
                    <p className={styles.text}>Ремонт редуктора</p>
                    <p className={styles.price}>{data.price.reducer}</p>
                </div>
                <div className={styles.text_box}>
                    <p className={styles.text}>Ремонт лазера</p>
                    <p className={styles.price}>{data.price.laser}</p>
                </div>
                <div className={styles.text_box}>
                    <p className={styles.text}>Ремонт электроники</p>
                    <p className={styles.price}>{data.price.electronics}</p>
                </div>
                <div className={styles.text_box}>
                    <p className={styles.text}>Ремонт сканера</p>
                    <p className={styles.price}>{data.price.scaner ? data.price.scaner : '-'}</p>
                </div>
                <div className={styles.text_box}>
                    <p className={styles.text}>Ремонт автоподатчика (ADF)</p>
                    <p className={styles.price}>{data.price.adf ? data.price.adf : '-'}</p>
                </div>
            </div>
        </div>
    )
}

export default RepairPriceComponent