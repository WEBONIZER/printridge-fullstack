import styles from './refill-item-component.module.css'
import { useParams } from "react-router-dom";
import { refillData } from '../../../utils/refill';
import Tabs from '../../tabs/tabs';
import ImageBox from '../refill-item-component/image-box/image-box'
import DescriptionBox from './description-box/description-box'

function RefillItemComponent() {

    const { model } = useParams()
    const data = refillData.find((i) => i.modelCart === model)

    return (
        <div className={styles.container}>
            <div className={styles.img_desc_box}>
                <div className={styles.left_box}>
                    <h2 className={styles.name}>Заправка картриджа {`${data.vendor.toUpperCase()} ${data.modelCart}`}</h2>
                    <div className={styles.price_container}>
                        <p className={styles.devices}>Подходит для {data.devices}</p>
                        {data.resource && <p className={styles.resource}>Ресурс картриджа: {data.resource} стр., при заполнении страницы 5%</p>}
                        <p className={styles.prices}>Стоимость услуг:</p>
                        <p className={styles.pefill_price}>Заправка картриджа {`${data.modelCart}`}: {`${data.refill_price}`}</p>
                        <p className={styles.refill_repair_price}>Восстановление картриджа {`${data.modelCart}`}: {`${data.recovery_price}`}</p>
                        <p className={styles.chip_price}>Замена чипа: {`${data.chip ? 'уточняйте' : 'не требуется'}`}</p>
                    </div>
                </div>
                <ImageBox />
            </div>
            <DescriptionBox />
            {data.examples.length !== 0 && <Tabs items={data.examples} />}
        </div>
    );
}

export default RefillItemComponent;