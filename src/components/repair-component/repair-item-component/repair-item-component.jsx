import styles from './repair-item-component.module.css'
import { useParams } from "react-router-dom";
import { repair } from '../../../utils/repair';
import Tabs from '../../tabs/tabs';
import ImageRapairBox from '../image-repair-box/image-repair-box'
import DescriptionRepairBox from '../description-repair-box/description-repair-box'
import UseCartridges from '../use-cartridges/use-cartridges'

function RepairItemComponent() {

    const { model } = useParams()
    const data = repair.find((i) => i.model.replace(/\s/g, '') === model)
    
    return (
        <div className={styles.container}>
            <div className={styles.img_desc_box}>
                <div className={styles.price_container}>
                    <h2 className={styles.header}>Ремонт {data.device === 'printer' ? 'принтера' : 'МФУ'} {`${data.vendor.toUpperCase()} ${data.model}`}</h2>
                    <div className={styles.specifications}>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Способ печати</p>
                            <p className={styles.black_text}>{data.type === 'mono' && 'Монохромный' || data.type === 'color' && 'Цветной'}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Тип устройства</p>
                            <p className={styles.black_text}>{data.device === 'printer' && 'Принтер' || data.device === 'MFU' && 'МФУ'}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Формат печати</p>
                            <p className={styles.black_text}>{data.format}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Скорость</p>
                            <p className={styles.black_text}>{`${data.speed} стр./мин.`}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Максимальная нагрузка (стр.)</p>
                            <p className={styles.black_text}>{`${data.capacity} в месяц`}</p>
                        </div>
                    </div>
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
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Ремонт сканера</p>
                            <p className={styles.black_text}>{data.price.scaner ? data.price.scaner : '-'}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.blue_text}>Ремонт автоподатчика (ADF)</p>
                            <p className={styles.black_text}>{data.price.adf ? data.price.adf : '-'}</p>
                        </div>
                    </div>
                </div>
                <ImageRapairBox />
                <h2 className={styles.header_mobile}>Ремонт {data.device === 'printer' ? 'принтера' : 'МФУ'} {`${data.vendor.toUpperCase()} ${data.model}`}</h2>
            </div>
            <DescriptionRepairBox />
            {data.cartridges.length !== 0 && <UseCartridges model={model} cartridgesArray={data.cartridges} />}
            {data.examples.length !== 0 && <Tabs items={data.examples} />}
        </div>
    );
}

export default RepairItemComponent;