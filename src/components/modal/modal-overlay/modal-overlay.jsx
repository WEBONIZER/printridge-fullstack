import styles from './modal-overlay.module.css';
import { Link } from "react-router-dom";

const ModalOverlay = () => {

    return (
        <Link
            className={styles.modal_overlay}
            state={null}
        />
    )
}

export default ModalOverlay; 