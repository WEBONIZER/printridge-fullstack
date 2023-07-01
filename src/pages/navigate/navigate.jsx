import styles from './navigate.module.css'
import MainMenu from '../../components/main-menu/main-menu'

function NavigationMenu() {

    return (
        <div className={styles.menu}>
            <MainMenu />
        </div>
    );
}

export default NavigationMenu;