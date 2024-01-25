import styles from './main-menu.module.css'
import { NavLink } from 'react-router-dom';

function MainMenu() {

    const activeLink = ({ isActive }) => ({ color: isActive ? '#fff' : '#000' });

    return (
        <nav className={styles.main_menu}>
            <NavLink
                style={activeLink}
                className={styles.link}
                to="/refill"
            >
                Заправка картриджей
            </NavLink>
            <NavLink
                style={activeLink}
                className={styles.link}
                to="/repair"
            >
                Ремонт принтеров
            </NavLink>
            <NavLink
                style={activeLink}
                className={styles.link}
                to="/contacts"
            >
                Контакты
            </NavLink>
        </nav>
    );
}

export default MainMenu;