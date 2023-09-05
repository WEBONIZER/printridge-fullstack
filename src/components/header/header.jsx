import styles from './header.module.css'
import { NavLink } from 'react-router-dom';
import SocialIcons from './social-icons/social-icons'
import FeedbackButton from '../../components/feedback-button/feedback-button'

function HeaderComponent() {
    return (
        <div className={styles.container}>
            <div className={styles.logo_container}>
                    <NavLink
                        className={styles.link}
                        to="/">
                        <p className={styles.Logo}>ПРИНТРИДЖ</p>
                    </NavLink>
                    <div>
                        <p>
                            Обуховской обороны, 116к1, лит. Е, 4-й этаж
                        </p>
                        <p>fox.spb@bk.ru</p>
                    </div>
            </div>
            <div className={styles.phone_social_box}>
                <SocialIcons />
                <a className={styles.link} href={`tel:${+7 - 953 - 368 - 18 - 36}`}>{<p className={styles.phone}>8-953-368-18-36</p>}</a>
                <div className={styles.feedbackbutton}><FeedbackButton /></div>
            </div>
        </div>
    );
}

export default HeaderComponent;