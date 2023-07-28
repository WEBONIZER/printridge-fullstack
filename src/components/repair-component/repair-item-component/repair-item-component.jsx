import styles from './repair-item-component.module.css'
import { useParams } from "react-router-dom";
import { repair } from '../../../utils/repair';
import Tabs from '../../tabs/tabs';

function RepairItemComponent() {
    const images = require.context('../../../images/repair', true);
    const { model, vendor } = useParams()
    const data = repair.find((i) => i.model.replace(/\s/g, '') === model)
    const img = images.keys().includes(`./${vendor}/${model}.png`) ? images(`./${vendor}/${model}.png`) : null;
    //console.log(data)
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Ремонт {data.device === 'printer' ? 'принтера' : 'МФУ'} {`${data.vendor.toUpperCase()} ${data.model}`}</h1>

            <div className={styles.img_desc_box}>
                <div className={styles.left_box}>
                    {img && (
                        <img
                            className={styles.image}
                            src={img}
                            alt={model}
                        />
                    )}
                    <div className={styles.price_container}>
                        <h2>Стоимость услуг:</h2>
                        <strong><p>Диагностика: {data.price.diagnostics}</p></strong>
                        <strong><p>ТО: {data.price.TO}</p></strong>
                        <strong><p>Замена роликов: {data.price.rollers}</p></strong>
                        <strong><p>Ремонт барабана: {data.price.drum}</p></strong>
                        <strong><p>Ремонт термоблока (печки): {data.price.therm}</p></strong>
                        <strong><p>Ремонт дуплекса: {data.price.duplex}</p></strong>
                        <strong><p>Ремонт редуктора: {data.price.reducer}</p></strong>
                        <strong><p>Ремонт лазера: {data.price.laser}</p></strong>
                        <strong><p>Ремонт электроники: {data.price.electronics}</p></strong>
                        {data.price.scaner !== null && <strong><p>Ремонт сканера: {data.price.scaner}</p></strong>}
                        {data.price.adf !== null && <strong><p>Ремонт автоподатчика (ADF): {data.price.adf}</p></strong>}
                    </div>
                    <div className={styles.text_container}>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!</p>
                    </div>
                </div>
                {/*<{
                    data.examples.length !== 0
                    &&
                    <div className={styles.tabs_box}>
                        <Tabs items={data.examples} />
                    </div>*/}
            </div>
        </div>
    );
}

export default RepairItemComponent;