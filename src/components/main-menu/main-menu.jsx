import styles from './main-menu.module.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import {
    MENU_MOBILE_BUTTON,
} from "../../services/actions/buttons";

function MainMenu({ position }) {

    const dispatch = useDispatch();
    const { mobileMenuButton } = useSelector((state) => state.buttons);

    const handleClick = () => {
        dispatch({
            type: MENU_MOBILE_BUTTON,
            mobileMenuButton: false
        })
    }
    //console.log(mobileMenuButton)
    return (
        <nav className={position === 'header' && styles.main_menu_horisontal || (position === 'footer' && mobileMenuButton ? styles.main_menu_center_align : styles.main_menu_vertical)}>
            <NavLink
                className={position === 'footer' ? styles.link_footer : styles.link_invisible}
                to="/"
                onClick={handleClick}
            >
                Главная
            </NavLink>
            <NavLink
                className={position === 'header' && styles.link || position === 'footer' && styles.link_footer}
                to="/refill/hp"
                onClick={handleClick}
            >
                Заправка картриджей
            </NavLink>
            <NavLink
                className={position === 'header' && styles.link || position === 'footer' && styles.link_footer}
                to="/repair/hp"
                onClick={handleClick}
            >
                Ремонт принтеров
            </NavLink>
            <NavLink
                className={position === 'header' && styles.link || position === 'footer' && styles.link_footer}
                to="/contacts"
                onClick={handleClick}
            >
                Контакты
            </NavLink>
        </nav>
    );
}

export default MainMenu;