import styles from './use-cartridges.module.css'
import { refillData } from '../../../utils/refill'
import { Link } from 'react-router-dom'

const UseCartridges = ({ cartridgesArray }) => {



    return (
        cartridgesArray.map((i, key) => {
            const cartridge = refillData.find(j => j.modelCart === i)
            return (
                cartridge !== undefined &&
                <div className={styles.container} key={key}>
                    <img className={styles.image} src={`https://storage.yandexcloud.net/printridge/refill/${cartridge.vendor}/${cartridge.modelCart}.png`} alt={`Ремонт ${cartridge.modelCart}`} />
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
        })
    )
}

export default UseCartridges