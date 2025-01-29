import { Link } from 'react-router-dom'
import styles from './main-page-description-box.module.css'

const MainPageDescriptionBox = ({ title, description, name }) => {

    return (
        <section className={styles.container}>
            <Link
                className={name === 'refill' && styles.link_image_to_refill_mobile || name === 'repair' && styles.link_image_to_repair_mobile || name === 'remont-noutbukov' && styles.link_image_to_refill_mobile}
                to={name === 'refill' && "/refill/hp" || name === 'repair' && "/repair/hp" || name === 'remont-noutbukov' && "/remont-noutbukov/hp"}
            >
            </Link>
            <div className={styles.content_box}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>
            <Link
                className={name === 'refill' && styles.link_image_to_refill || name === 'repair' && styles.link_image_to_repair || name === 'remont-noutbukov' && styles.link_image_to_refill}
                to={name === 'refill' && "/refill/hp" || name === 'repair' && "/repair/hp" || name === 'remont-noutbukov' && "/remont-noutbukov/hp"}
            >
            </Link>
            <Link
                className={styles.mobile_button}
                to={name === 'refill' && "/refill/hp" || name === 'repair' && "/repair/hp" || name === 'remont-noutbukov' && "/remont-noutbukov/hp"}
            >
               <p className={styles.button_name}>Подробнее</p> 
            </Link>
        </section>
    )
}

export default MainPageDescriptionBox