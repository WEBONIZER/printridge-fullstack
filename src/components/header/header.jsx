import styles from './header.module.css'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import MainMenu from '../main-menu/main-menu'
import image from '../../images/Rectangle_850.svg'
import imagePrinter from '../../images/image-printer-blue.svg'

function HeaderComponent() {

    const location = useLocation();
    const { vendor } = useParams()

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
                        <h1 className={styles.slogan_big}>{
                            location.pathname.includes('refill') ? `Заправка картриджей ${vendor === undefined ? '' : vendor.toUpperCase()}` :
                                location.pathname.includes('repair') ? 'Ремонт принтеров и МФУ' :
                                    'Printridge — решение проблем с печатной техникой'
                        }</h1>
                        <p className={styles.slogan_small}>{
                            location.pathname.includes('refill') ? 'Зачем нужна заправка картриджей? Заправка картриджей нужна чтобы заправить картридж' :
                                location.pathname.includes('repair') ? 'Зачем нужен ремонт принтеров? Ремонт принтеров нужен чтобы отремонтировать принтер' :
                                    'Заправка картриджей всех видов и ремонт принтеров любой модели и любой сложности'
                        }</p>
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