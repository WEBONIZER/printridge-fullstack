import styles from './main-menu.module.css'
import { NavLink } from 'react-router-dom';

function MainMenu({ position }) {

    return (
        <nav className={position === 'header' && styles.main_menu_horisontal || position === 'footer' && styles.main_menu_vertical}>
            <NavLink
                className={position === 'footer' ? styles.link_footer : styles.link_invisible}
                to="/"
            >
                Главная
            </NavLink>
            <NavLink
                className={position === 'header' && styles.link || position === 'footer' && styles.link_footer}
                to="/refill/hp"
            >
                Заправка картриджей
            </NavLink>
            <NavLink
                className={position === 'header' && styles.link || position === 'footer' && styles.link_footer}
                to="/repair/hp"
            >
                Ремонт принтеров
            </NavLink>
            <NavLink
                className={position === 'header' && styles.link || position === 'footer' && styles.link_footer}
                to="/contacts"
            >
                Контакты
            </NavLink>
        </nav>
    );
}

export default MainMenu;