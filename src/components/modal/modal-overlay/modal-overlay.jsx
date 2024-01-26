import styles from './modal-overlay.module.css';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const ModalOverlay = () => {

    const location = useLocation();

    return (
        <Link
            className={styles.modal_overlay}
            state={null}
            to={`${location.pathname}`}
        />
    )
}

export default ModalOverlay; 