import styles from './contacts-component.module.css'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const ContactsComponent = () => {    

    useEffect(() => {
        document.title = "Компания ПРИНТРИДЖ, контакты";
        document.querySelector('meta[name="title"]').setAttribute('content', `Компания ПРИНТРИДЖ, контакты`);
        document.querySelector('meta[name="description"]').setAttribute('content', `Информация о компании ПРИНТРИДЖ, контакты`);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.info_contacts}>
                <Link
                    className={styles.info_row}
                    to={`yandexnavi://search?text='Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж'`}
                >
                    <div className={styles.info_row_img_location} />
                    <p className={styles.info_row_text}>Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж</p>
                </Link>
                <Link
                    className={styles.info_row}
                    to={`tel:+79944390149`}
                >
                    <div className={styles.info_row_img_call} />
                    <p className={styles.info_row_text}>+7 994 439-01-49</p>
                </Link>
                <Link
                    className={styles.info_row}
                    to={`mailto:sales@printridge.ru`}
                >
                    <div className={styles.info_row_img_earth} />
                    <p className={styles.info_row_text}>sales@printridge.ru</p>
                </Link>
                <Link
                    className={styles.info_row}
                    to="https://vk.com/printridgespb"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className={styles.info_row_img_vk} />
                    <p className={styles.info_row_text}>VK</p>
                </Link>
                <Link
                    className={styles.info_row}
                    to="https://t.me/DenFoxPrint"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className={styles.info_row_img_telegram} />
                    <p className={styles.info_row_text}>@DenFoxPrint</p>
                </Link>
            </div>
            <div className={styles.map_box}>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A9944aa2dee5eddb4431580638a8ce5bef6321cc7a9bd5590e12a215b48248c7f&amp;source=constructor"
                    width="100%"
                    height="720"
                    frameborder="0">
                </iframe>
            </div>
            {/*<div className={styles.map_box_menu}>
                <iframe
                    src="http://brontosaur.ru:555/idiot-spb"
                    width="100%"
                    height="850"
                    frameborder="0">
                </iframe>
    </div>*/}
        </div>
    )
}

export default ContactsComponent