import styles from './social-icons.module.css'
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
                to="https://t.me/DenBrontosaur"
                target="_blank"
                rel="noopener noreferrer"
            />
        </div>
    )
}

export default SocialIcons