import styles from './refill-item-component.module.css'
import { useParams } from "react-router-dom";
import { refillData } from '../../../utils/refill'

function RefillItemComponent() {

    const { model, vendor } = useParams()
    const data = refillData.find((i) => i.modelCart === model)
    //const img = require(`../../../images/refill/${vendor}/${model}.png`);

    console.log(data)
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Заправка картриджа {`${data.vendor} ${data.modelCart}`}</h1>
            <div className={styles.img_desc_box}>
            <img 
            className={styles.imsge} 
            //src={img} 
            alt={ `${vendor} ${model}`
            } />
            <div>
            <h2>подходит для {data.devices}</h2>
            <h2>Стоимость услуг:</h2>
            <p>Заправка картриджа {`${data.modelCart}`}: {`${data.refill_price}`}</p>
            <p>Восстановление картриджа {`${data.modelCart}`}: {`${data.recovery_price}`}</p>
            <p>Замена чипа: {`${data.chip ? 'уточняйте' : 'не требуется'}`}</p>
            </div>
            </div>
            <p>Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!</p>

        </div>
    );
}

export default RefillItemComponent;