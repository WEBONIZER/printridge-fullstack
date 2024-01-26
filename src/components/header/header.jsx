import styles from './header.module.css'
import { NavLink } from 'react-router-dom'
import MainMenu from '../main-menu/main-menu'
import image from '../../images/Rectangle_850.svg'
import imagePrinter from '../../images/image-printer-blue.svg'

function HeaderComponent() {
    return (
        <div className={styles.container}>
            <div className={styles.logo_container}>
                <div className={styles.info_box}>
                    <div className={styles.logo_and_menu}>
                        <NavLink
                            className={styles.link}
                            to="/">
                            Printridge
                        </NavLink>
                        <MainMenu position={'header'} />
                    </div>
                    <div className={styles.slogan_box}>
                        <p className={styles.slogan_big}>Printridge — решение проблем с печатной техникой</p>
                        <p className={styles.slogan_small}>Заправка картриджей всех видов и ремонт принтеров любой модели и любой сложности</p>
                    </div>
                </div>
            </div>
            <div className={styles.images_box}>
                <img className={styles.image} src={image} alt="Фото" />
                <img className={styles.image} src={imagePrinter} alt="Принтер" />
            </div>
        </div>
    );
}

export default HeaderComponent;