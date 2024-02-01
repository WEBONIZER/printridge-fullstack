import styles from './header.module.css'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import MainMenu from '../main-menu/main-menu'
import imageCall from '../../images/call.svg'
import imageEarth from '../../images/language.svg'

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
                <div className={styles.mail_box}>
                    <div className={styles.phone_box}>
                        <img className={styles.phone_box_image} src={imageCall} alt="Трубка" />
                        <p className={styles.phone_text}>+7 994 439-01-49</p>
                    </div>
                    <div className={styles.phone_box}>
                        <img className={styles.phone_box_image} src={imageEarth} alt="Трубка" />
                        <p className={styles.phone_text}>sales@printridge.ru</p>
                    </div>
                </div>
                <div className={styles.image}> </div>
            </div>
        </div>
    );
}

export default HeaderComponent;