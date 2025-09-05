import styles from './first-visit-modal.module.css'
import { useDispatch_ } from "../../../services/reducers/root-reducer";
import { modalSlice } from "../../../services/slices/modal";

export const FirstVisitModal = () => {

    const dispatch = useDispatch_();

    const handleClick = () => {
        localStorage.setItem('printridgeFirstVisit', 'true');
        dispatch(modalSlice.actions.firstVisitModalState(false));
    }
    //console.log(firstVisitModal)
    return (
        <div
            className={styles.first_visit_modal}
        >
            <p
                className={styles.title}
            >
                Внимание!!!
            </p>
            <p
                className={styles.description}
            >
                Мы работаем только на выезде!
            </p>
            <p
                className={styles.description}
            >
                Выезд бесплатный и осуществляется по всей территории Санкт-Петербурга и ближайшей области
            </p>
            <button
                className={styles.button}
                onClick={handleClick}
            >
                Отлично!
            </button>
        </div>
    );
}