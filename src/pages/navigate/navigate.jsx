import styles from './navigate.module.css'
import MainMenu from '../../components/main-menu/main-menu'
import FeedbackButton from '../../components/feedback-button/feedback-button'

function NavigationMenu() {

    return (
        <div className={styles.menu}>
            <MainMenu />
            <FeedbackButton />
        </div>
    );
}

export default NavigationMenu;