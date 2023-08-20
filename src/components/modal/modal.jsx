import ReactDOM from "react-dom";
import style from '../modal/modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useEffect, ReactNode } from 'react';
//import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, onClose, closeButton }) => {

    useEffect(() => {
        const handleESCclose = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", handleESCclose);

        return () => document.removeEventListener("keydown", handleESCclose);
    }, [onClose]);

    return ReactDOM.createPortal(
        (
            <div className={style.modal_position}>
                <ModalOverlay onClose={onClose} />
                <div className={style.open_modal}>
                    <button className={style.close_icon} onClick={closeButton}>
                       X
                    </button>
                    {children}
                </div>
            </div>
        ),
        modalRoot
    );
}

export default Modal;