import styles from './use-cartridges.module.css'
import { refillData } from '../../../utils/refill'
import { Link } from 'react-router-dom'

const UseCartridges = ({ model, cartridgesArray }) => {



    return (
        <>
            {cartridgesArray.map((i, key) => {
                const cartridge = refillData.find(j => j.modelCart === i)
                const images = require.context('../../../images/refill', true);
                //console.log(img)
                return (
                    cartridge !== undefined &&
                    <div className={styles.container} key={key}>
                        <img className={styles.image} src={images.keys().includes(`./${cartridge.vendor}/${cartridge.modelCart}.png`) ? images(`./${cartridge.vendor}/${cartridge.modelCart}.png`) : null} />
                        <div className={styles.info_box}>
                            <p className={styles.title}>{`Заправка картриджа ${cartridge.vendor.toUpperCase()} ${cartridge.modelCart}`}</p>
                            <p className={styles.price}>{`Стоимость заправки ${cartridge.refill_price}`}</p>
                            <p className={styles.price}>{`Стоимость восстановления ${cartridge.recovery_price}`}</p>
                        </div>
                        <Link
                            className={styles.button}
                            to={`/refill/${cartridge.vendor}/${cartridge.modelCart}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Подробнее
                        </Link>
                    </div>
                )
            })}
        </>
    )
}

export default UseCartridges