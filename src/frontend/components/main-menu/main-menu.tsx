import styles from './main-menu.module.css'
import { Link } from 'react-router-dom';
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { modalSlice } from "../../services/slices/modal";

export const MainMenu = ({ position }: any) => {

    const dispatch = useDispatch_();
    const { mobileMenuButton } = useSelector_((state: any) => state.modalSlice);

    const handleClick = () => {
        dispatch(modalSlice.actions.mobileMenuButtonState(false));
    }
    //console.log(mobileMenuButton)
    return (
        <nav className={position === 'header' && styles.main_menu_horisontal || (position === 'footer' && mobileMenuButton ? styles.main_menu_center_align : styles.main_menu_vertical)}>
            <Link
                className={position === 'footer' ? styles.link_footer : styles.link_invisible}
                to="/"
                onClick={handleClick}
            >
                Главная
            </Link>
            <Link
                className={position === 'header' ? styles.link : styles.link_footer}
                to="/refill/hp"
                onClick={handleClick}
            >
                Заправка картриджей
            </Link>
            <Link
                className={position === 'header' ? styles.link : styles.link_footer}
                to="/repair/hp"
                onClick={handleClick}
            >
                Ремонт принтеров
            </Link>
            <Link
                className={position === 'header' ? styles.link : styles.link_footer}
                to="/remont-noutbukov/hp"
                onClick={handleClick}
            >
                Ремонт ноутбуков
            </Link>
            <Link
                className={position === 'header' ? styles.link : styles.link_footer}
                to="/blog"
                onClick={handleClick}
            >
                Блог
            </Link>
            <Link
                className={position === 'header' ? styles.link : styles.link_footer}
                to="/contacts"
                onClick={handleClick}
            >
                Контакты
            </Link>
        </nav>
    );
}