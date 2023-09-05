import styles from './social-icons.module.css'
import imageVk from '../../../images/social/icons8-vk-circled.svg';
import imageTelegram from '../../../images/social/icons8-telegram-app.svg';
import imageWhatsapp from '../../../images/social/icons8-whatsapp.svg';

const SocialIcons = () => {



    return (
        <div className={styles.icons_box}>
            <a href="https://vk.com/" target="_blank"><img className={styles.icon} src={imageVk} alt="" /></a>
            <a href=' https://t.me/+79516878803' target="_blank"><img className={styles.icon} src={imageTelegram} alt="" /></a>
            <a href={`https://api.whatsapp.com/send?phone=${+79516878803}`} target="_blank"><img className={styles.icon} src={imageWhatsapp} alt="" /></a>
        </div>
    )
}

export default SocialIcons