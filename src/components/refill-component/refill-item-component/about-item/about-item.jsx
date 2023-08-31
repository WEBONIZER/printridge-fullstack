import styles from './about-item.module.css'
import { refillData } from '../../../../utils/refill';
import { useParams } from "react-router-dom";

const AboutItem = () => {

    const { model } = useParams()
    const data = refillData.find((i) => i.modelCart === model)

    return (
        <>
            <div className={styles.price_container}>
                <h2>подходит для {data.devices}</h2>
                {data.resource && <p>Ресурс картриджа: {data.resource} стр., при заполнении страницы 5%</p>}
                <h2>Стоимость услуг:</h2>
                <strong><p>Заправка картриджа {`${data.modelCart}`}: {`${data.refill_price}`}</p></strong>
                <strong><p>Восстановление картриджа {`${data.modelCart}`}: {`${data.recovery_price}`}</p></strong>
                <strong><p>Замена чипа: {`${data.chip ? 'уточняйте' : 'не требуется'}`}</p></strong>
            </div>
        </>
    )
}

export default AboutItem