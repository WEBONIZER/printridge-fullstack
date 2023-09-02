import styles from './repair-item.module.css'
import { Link } from 'react-router-dom'

const RepairItem = () => {

    const image = require('../../../../images/repair/kyocera/TASKalfa6501.png')

    return (
        <div className={styles.box}>
            <h1 className={styles.title}>Ремонт принтеров и МФУ</h1>
            <div className={styles.refill_box}>
                <div className={styles.description_and_button}>
                    <p className={styles.description_refill}>
                        Ремонт принтеров и МФУ в нашей компании осуществляется с использованием тонеров лучших мировых производителей.
                        В процессе заправки каждый картридж тестируется на наличие дефектов, тщательно вычищается от старого содержимого, разбирается
                        и собирается без повреждения корпуса.<br />
                        Так же, возможна доставка от клиента и обратно.
                    </p>
                    <Link
                        className={styles.button}
                        to='/repair'
                    >Подробнее...
                    </Link>
                </div>
                <img className={styles.image} src={image} alt="zapravka" />
            </div>
        </div>
    )
}

export default RepairItem