import styles from './contacts-component.module.css'
import imgLocation from '../../images/location_on.svg'
import imgCall from '../../images/call-blue.svg'
import imgEarth from '../../images/language-blue.svg'
import imgVk from '../../images/icon-vk.svg'
import imgTelegram from '../../images/icon-telegram.svg'

const ContactsComponent = () => {
    return (
        <div className={styles.container}>
            <div className={styles.info_contacts}>
                <div className={styles.info_row}>
                    <img className={styles.info_row_img} src={imgLocation} alt="Локация" />
                    <p className={styles.info_row_text}>Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж</p>
                </div>
                <div className={styles.info_row}>
                    <img className={styles.info_row_img} src={imgCall} alt="Телефон" />
                    <p className={styles.info_row_text}>+7 994 439-01-49</p>
                </div>
                <div className={styles.info_row}>
                    <img className={styles.info_row_img} src={imgEarth} alt="Почта" />
                    <p className={styles.info_row_text}>sales@printridge.ru</p>
                </div>
                <div className={styles.info_row}>
                    <img className={styles.info_row_img} src={imgVk} alt="ВК" />
                    <p className={styles.info_row_text}>VK</p>
                </div>
                <div className={styles.info_row}>
                    <img className={styles.info_row_img} src={imgTelegram} alt="Телеграм" />
                    <p className={styles.info_row_text}>@DenFoxPrint</p>
                </div>
            </div>
            <div className={styles.map_box}>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A9944aa2dee5eddb4431580638a8ce5bef6321cc7a9bd5590e12a215b48248c7f&amp;source=constructor"
                    width="100%"
                    height="720"
                    frameborder="0">
                </iframe>
            </div>
        </div>
    )
}

export default ContactsComponent