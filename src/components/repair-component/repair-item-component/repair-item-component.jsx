import styles from './repair-item-component.module.css'
import { useParams } from "react-router-dom";
import { repair } from '../../../utils/repair';
import Tabs from '../../tabs/tabs';

function RepairItemComponent() {
    const images = require.context('../../../images/repair', true);
    const { model, vendor } = useParams()
    const data = repair.find((i) => i.model.replace(/\s/g, '') === model)
    const img = images.keys().includes(`./${vendor}/${model}.png`) ? images(`./${vendor}/${model}.png`) : null;

    return (
        <div className={styles.container}>
            <div className={styles.img_desc_box}>
                <div className={styles.price_container}>
                    <h2 className={styles.header}>Ремонт {data.device === 'printer' ? 'принтера' : 'МФУ'} {`${data.vendor.toUpperCase()} ${data.model}`}</h2>
                    <p className={styles.boxes_title}>Цены</p>
                    <div className={styles.price_wrap_box}>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Диагностика</p>
                            <p className={styles.black_text}>{data.price.diagnostics}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>ТО</p>
                            <p className={styles.black_text}>{data.price.TO}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Замена роликов</p>
                            <p className={styles.black_text}>{data.price.rollers}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Ремонт барабана</p>
                            <p className={styles.black_text}>{data.price.drum}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Ремонт термоблока (печки)</p>
                            <p className={styles.black_text}>{data.price.therm}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Ремонт дуплекса</p>
                            <p className={styles.black_text}>{data.price.duplex}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Ремонт редуктора</p>
                            <p className={styles.black_text}>{data.price.reducer}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Ремонт лазера</p>
                            <p className={styles.black_text}>{data.price.laser}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Ремонт электроники</p>
                            <p className={styles.black_text}>{data.price.electronics}</p>
                        </div>
                        {data.price.scaner !== null && <div className={styles.text_box}>
                            <p className={styles.blue_text}>Ремонт сканера</p>
                            <p className={styles.black_text}>{data.price.scaner}</p>
                        </div>}
                        {data.price.adf !== null && <div className={styles.text_box}>
                            <p className={styles.blue_text}>Ремонт автоподатчика (ADF)</p>
                            <p className={styles.black_text}>{data.price.adf}</p>
                        </div>}
                    </div>
                </div>
                {img && (
                    <img
                        className={styles.image}
                        src={img}
                        alt={model}
                    />
                )}
            </div>
            <p className={styles.text_container}>&nbsp;&nbsp;&nbsp;&nbsp;Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер! Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor.toUpperCase()} ${data.model}`} используется самый лучший в мире тонер!
            </p>
            {data.examples.length !== 0 && <Tabs items={data.examples} />}
        </div>
    );
}

export default RepairItemComponent;