import styles from './refill-item-component.module.css'
import { useParams } from "react-router-dom";
import { refillData } from '../../../utils/refill';
import Tabs from '../../tabs/tabs';

function RefillItemComponent() {
    const images = require.context('../../../images/refill', true);
    const { model, vendor } = useParams()
    const data = refillData.find((i) => i.modelCart === model)
    const img = images.keys().includes(`./${vendor}/${model}.png`) ? images(`./${vendor}/${model}.png`) : null;

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Заправка картриджа {`${data.vendor} ${data.modelCart}`}</h1>
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
                        <h2>подходит для {data.devices}</h2>
                        <h2>Стоимость услуг:</h2>
                        <strong><p>Заправка картриджа {`${data.modelCart}`}: {`${data.refill_price}`}</p></strong>
                        <strong><p>Восстановление картриджа {`${data.modelCart}`}: {`${data.recovery_price}`}</p></strong>
                        <strong><p>Замена чипа: {`${data.chip ? 'уточняйте' : 'не требуется'}`}</p></strong>
                    </div>
                    <div className={styles.text_container}>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                            Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!</p>
                    </div>
                </div>
                {
                    data.examples.length !== 0
                    &&
                    <div className={styles.tabs_box}>
                        <Tabs items={data.examples} />
                    </div>
                }
            </div>



        </div>
    );
}

export default RefillItemComponent;