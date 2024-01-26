import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import style from '../modal/modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useEffect } from 'react';

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children }) => {

    return ReactDOM.createPortal(
        (
            <div className={style.modal_position}>
                <ModalOverlay />
                <div className={style.open_modal}>
                    <Link className={style.close_icon} state={{ background: null }}>
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