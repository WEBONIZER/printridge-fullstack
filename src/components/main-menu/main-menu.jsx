import { useNavigate } from "react-router-dom";
import styles from './main-menu.module.css'
import { NavLink } from 'react-router-dom';

function MainMenu() {
    const activeLink = ({ isActive }) => ({ color: isActive ? '#F2F2F3' : '#000' });
    //const navigate = useNavigate();

    return (
        <nav className={styles.main_menu}>
            <NavLink
                style={activeLink}
                className={styles.link}
                to="/"
            >
                Главная
            </NavLink>
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