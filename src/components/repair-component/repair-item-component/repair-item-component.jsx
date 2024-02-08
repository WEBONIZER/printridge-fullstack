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
                {img && (
                    <img
                        className={styles.image}
                        src={img}
                        alt={model}
                    />
                )}
                <h2 className={styles.header_mobile}>Ремонт {data.device === 'printer' ? 'принтера' : 'МФУ'} {`${data.vendor.toUpperCase()} ${data.model}`}</h2>
            </div>
            <p className={styles.text_container}>
                Выше указаны цены за ремонт конкретного блока вашего аппарата, без стоимости запчастей! Это обусловлено тем, что цены на запчасти постоянно меняются.
                Сколько будет стоить ремонт именно в вашем случае, мы сможем сказать после диагностики.<br /><br />
                Для быстрой диагностики неисправностей, в случаях, когда устройство печатает с дефектами,
                подготовьте, пожалуйста, скан с примером или фото в хорошем качестве. Это значительно ускорит процесс ремонта и, 
                в большинстве случаев, сделает диагностику <strong>БЕСПЛАТНОЙ!</strong><br /><br />
                Большую часть неисправностей вашей техники возможно решить <strong>на выезде</strong>, не забирая устройство. 
                Потому, <strong>ремонт {data.device === 'printer' ? 'принтера' : 'МФУ'} {`${data.vendor.toUpperCase()} ${data.model}`}</strong> осуществляется
                как на выезде (в офисе клиента), так и в стационаре (в нашей мастерской).<br /><br />
                Для ремонта {data.device === 'printer' ? 'принтера' : 'МФУ'} {`${data.vendor.toUpperCase()} ${data.model}`} используются оригинальные запчасти. 
                Но, по желанию клиента, возможна
                установка совместимых. Качественные совместимые запчасти очень часто работают дольше и качественнее, нежели оригинал. Хотя, в ряде случаев, ресурс может быть меньше.
                О всех возможных нюансах и последствиях мы вас непременно предупредим.<br /><br />
            </p>
            {data.examples.length !== 0 && <Tabs items={data.examples} />}
        </div>
    );
}

export default RepairItemComponent;