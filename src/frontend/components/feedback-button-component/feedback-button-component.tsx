import styles from './feedback-button-component.module.css'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { modalSlice } from "../../services/slices/modal";
import { Modal } from "../modal/modal";
import { FeedbackForm } from "../forms/feedback-form/feedback-form";

export const FeedbackButtonComponent = () => {

    const { feedbackModalButton } = useSelector_((state: any) => state.modalSlice);

    return (
        <>
            {feedbackModalButton && (
                <Modal action={modalSlice.actions.feedbackButtonState}>
                    <FeedbackForm />
                </Modal>
            )}
            <div className={styles.container}>
                <div className={styles.info_box}>
                    <p className={styles.title}>{'Остались вопросы?'}</p>
                    <p className={styles.description}>{'Вы можете связаться с нами с помощью формы “Обратной связи”, наши специалисты ответят вам в течении рабочего дня.'}</p>
                </div>
                <Link
                    className={styles.button}
                    to="https://t.me/DenBrontosaur"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Написать
                </Link>
            </div>
        </>
    )
}