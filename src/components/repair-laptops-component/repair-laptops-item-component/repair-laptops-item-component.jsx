import styles from './repair-laptops-item-component.module.css'
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { repairLaptops } from '../../../utils/laptops';
import Tabs from '../../tabs/tabs';
import ImageRapairBox from '../image-repair-laptops/image-repair-laptops'
import DescriptionRepairBox from '../description-repair-laptops/description-repair-laptops'
import RepairPriceComponent from '../repair-laptops-price-component/repair-laptops-price-component'

function RepairLaptopsItemComponent() {

    const { model } = useParams()
    const data = repairLaptops.find((i) => i.model.replace(/\s/g, '') === model)

    return (data ?
        <div>
            <div className={styles.container}>
            <h1 className={styles.header}>Ремонт ноутбука {`${data.vendor.toUpperCase()} ${data.series !== '' ? data.series : ''} ${data.model}`}</h1>
                <div className={styles.img_desc_box}>
                    <div className={styles.price_container}>                        
                        <div className={styles.specifications}>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Диагональ экрана:</p>
                                <p className={styles.black_text}>{`${data.display} "`}</p>
                            </div>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Процессор:</p>
                                <p className={styles.black_text}>{`${data.processorVendor} ${data.processorName}`}</p>
                            </div>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Видео:</p>
                                <p className={styles.black_text}>{data.video}</p>
                            </div>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Оперативная память:</p>
                                <p className={styles.black_text}>{`${data.ram} Гб`}</p>
                            </div>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Тип оперативной памяти:</p>
                                <p className={styles.black_text}>{data.ramType}</p>
                            </div>
                        </div>
                    </div>
                    <ImageRapairBox />
                    <h2 className={styles.header_mobile}>Ремонт ноутбука {`${data.vendor.toUpperCase()} ${data.series !== '' ? data.series : null} ${data.model}`}</h2>
                </div>


            </div>
            <RepairPriceComponent data={data} />
            <DescriptionRepairBox />
            {data.examples.length !== 0 && <Tabs items={data.examples} />}
        </div> :
        <Navigate to="/404" replace />
    );
}

export default RepairLaptopsItemComponent;