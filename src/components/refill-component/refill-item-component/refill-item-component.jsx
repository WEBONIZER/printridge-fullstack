import styles from './refill-item-component.module.css'
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { refillData } from '../../../utils/refill'

function RefillItemComponent() {

    const { model, vendor } = useParams()
    const data = refillData.find((i) => i.modelCart === model)
    const img = require(`../../../images/refill/${vendor}/${model}.png`);

    console.log(data)
    return (
        <div>
            <h1>Заправка картриджа {`${data.vendor} ${data.modelCart}`}</h1>
            <h1>подходит для {data.devices}</h1>
            <img src={img} alt={ `${vendor} ${model}`} />
            <p>Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!</p>
            <h2>Стоимость услуг:</h2>
            <p>Заправка картриджа {`${data.modelCart}`}: {`${data.refill_price}`}</p>
            <p>Восстановление картриджа {`${data.modelCart}`}: {`${data.recovery_price}`}</p>
            <p>Замена чипа: {`${data.chip ? 'уточняйте' : 'не требуется'}`}</p>
        </div>
    );
}

export default RefillItemComponent;