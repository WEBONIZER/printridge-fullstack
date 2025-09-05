import styles from './footer.module.css'
import { MainMenu } from '../main-menu/main-menu'
import { Link } from 'react-router-dom';
import SocialIcons from '../social-icons/social-icons'

export const FooterComponent = () => {

    return (
        <section className={styles.footer}>
            <div className={styles.footer_box}>
                <div className={styles.adress_box}>
                    <div className={styles.adress_container}>
                        <img
                            className={styles.location_img}
                            src='https://s3.ru1.storage.beget.cloud/3aaacc647142-brontosaur/printridge/location_on.svg'
                            alt="location"
                        />
                        <Link
                            className={styles.adress_text}
                            to={`yandexnavi://search?text='Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж'`}
                        >{'Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж'}</Link>
                    </div>
                    <Link
                        className={styles.site_name_text}
                        to='/'
                    />
                </div>
                <div className={styles.menu_box}>
                    <MainMenu position={'footer'} />
                    <Link
                        className={styles.user_agreement_text}
                        to='https://webonizer.su/'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {'Дизайн и разработка'}
                        <div className={styles.webonizer_logo} />
                    </Link>
                </div>
            </div>
            <div className={styles.footer_box}>
                <div className={styles.contacts_box}>
                    <p className={styles.contacts}>{'Контактная информация'}</p>
                    <Link
                        className={styles.phone}
                        to={`tel:+79944390149`}
                    >{'+7 994 439-01-49'}</Link>
                    <Link
                        className={styles.email}
                        to={`mailto:sales@printridge.ru`}
                    >{'sales@printridge.ru'}</Link>
                </div>
                <Link
                    className={styles.site_name_text_mobile}
                    to='/'
                />
                <div className={styles.social_box}>
                    <SocialIcons />
                </div>
            </div>
        </section>
    );
}