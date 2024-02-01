import styles from './footer.module.css'
import locationImg from '../../images/location_on.svg'
import MainMenu from '../main-menu/main-menu'
import { Link } from 'react-router-dom';
import SocialIcons from '../social-icons/social-icons'

function FooterComponent() {

    return (
        <section className={styles.footer}>
            <div className={styles.footer_box}>
                <div className={styles.adress_box}>
                    <div className={styles.adress_container}>
                        <img className={styles.location_img} src={locationImg} alt="location" />
                        <p className={styles.adress_text}>{'Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж'}</p>
                    </div>
                    <p className={styles.site_name_text}>{'Printridge'}</p>
                </div>
                <div className={styles.menu_box}>
                    <MainMenu position={'footer'} />
                    <Link className={styles.user_agreement_text}>{'Пользовательское соглашение'}</Link>
                </div>
            </div>
            <div className={styles.footer_box}>
                <div className={styles.contacts_box}>
                    <p className={styles.contacts}>{'Контактная информация'}</p>
                    <p className={styles.phone}>{'+7 994 439-01-49'}</p>
                    <p className={styles.email}>{'sales@printridge.ru'}</p>
                </div>
                <div className={styles.social_box}>
                    <SocialIcons />
                </div>
            </div>
        </section>
    );
}

export default FooterComponent;