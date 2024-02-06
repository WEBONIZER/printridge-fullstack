import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import style from '../modal/modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import {
    MENU_MOBILE_BUTTON,
} from "../../services/actions/buttons";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children }) => {

    const location = useLocation();
    const dispatch = useDispatch();
    const { mobileMenuButton } = useSelector((state) => state.buttons);

    const handleClick = () => {
        if (!mobileMenuButton) {
            dispatch({
                type: MENU_MOBILE_BUTTON,
                mobileMenuButton: true
            })
        } else {
            dispatch({
                type: MENU_MOBILE_BUTTON,
                mobileMenuButton: false
            })
        }
    }

    return ReactDOM.createPortal(
        (
            <div className={style.modal_position}>
                <ModalOverlay />
                <div className={style.open_modal}>
                    <Link
                        className={style.close_icon}
                        state={null}
                        to={`${location.pathname}`}
                        onClick={handleClick}
                    >
                        X
                    </Link>
                    {children}
                    <p className={style.site_name}>Printridge</p>
                </div>
            </div>
        ),
        modalRoot
    );
}

export default Modal;