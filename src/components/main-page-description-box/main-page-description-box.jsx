import { Link } from 'react-router-dom'
import styles from './main-page-description-box.module.css'

const MainPageDescriptionBox = ({ title, description, name }) => {

    return (
        <section className={styles.container}>
            <Link
                className={name === 'refill' && styles.link_image_to_refill_mobile || name === 'repair' && styles.link_image_to_repair_mobile}
                to={name === 'refill' && "/refill/hp" || name === 'repair' && "/repair/hp"}
            >
            </Link>
            <div className={styles.content_box}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>
            <Link
                className={name === 'refill' && styles.link_image_to_refill || name === 'repair' && styles.link_image_to_repair}
                to={name === 'refill' && "/refill/hp" || name === 'repair' && "/repair/hp"}
            >
            </Link>
            <Link
                className={styles.mobile_button}
                to={name === 'refill' && "/refill/hp" || name === 'repair' && "/repair/hp"}
            >
               <p className={styles.button_name}>Подробнее</p> 
            </Link>
        </section>
    )
}

export default MainPageDescriptionBox