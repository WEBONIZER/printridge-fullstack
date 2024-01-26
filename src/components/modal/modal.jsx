import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import style from '../modal/modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useLocation } from 'react-router-dom';

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children }) => {

    const location = useLocation();

    return ReactDOM.createPortal(
        (
            <div className={style.modal_position}>
                <ModalOverlay />
                <div className={style.open_modal}>
                    <Link
                        className={style.close_icon}
                        state={null}
                        to={`${location.pathname}`}
                    >
                        X
                    </Link>
                    {children}
                </div>
            </div>
        ),
        modalRoot
    );
}

export default Modal;