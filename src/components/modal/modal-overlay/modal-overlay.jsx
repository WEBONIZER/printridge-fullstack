import styles from './modal-overlay.module.css';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux"
import {
    MENU_MOBILE_BUTTON,
} from "../../../services/actions/buttons";

const ModalOverlay = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch({
            type: MENU_MOBILE_BUTTON,
            mobileMenuButton: false
        })
    }

    return (
        <Link
            className={styles.modal_overlay}
            state={null}
            to={`${location.pathname}`}
            onClick={handleClick}
        />
    )
}

export default ModalOverlay; 