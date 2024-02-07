import styles from './social-icons.module.css'
import imageVk from '../../images/social/icons8-vk-circled.svg';
import imageTelegram from '../../images/social/icons8-telegram-app.svg';
import { Link } from 'react-router-dom';

const SocialIcons = () => {



    return (
        <div className={styles.icons_box}>
            <Link
                className={styles.icon_vk}
                to="https://vk.com/printridgespb"
                target="_blank"
                rel="noopener noreferrer"
            />
            <Link
                className={styles.icon_telegram}
                to="https://t.me/DenFoxPrint"
                target="_blank"
                rel="noopener noreferrer"
            />
        </div>
    )
}

export default SocialIcons