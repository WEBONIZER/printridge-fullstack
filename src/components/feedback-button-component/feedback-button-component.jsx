import styles from './feedback-button-component.module.css'
import { useLocation, Link } from 'react-router-dom'

const FeedbackButtonComponent = () => {

    const location = useLocation();

    return (
        <div className={styles.container}>
            <div className={styles.info_box}>
                <p className={styles.title}>{'Остались вопросы?'}</p>
                <p className={styles.description}>{'Вы можете связаться с нами с помощью формы “Обратной связи”, наши специалисты ответят вам в течении рабочего дня.'}</p>
            </div>
            <Link
                className={styles.button}
                to={`${location.pathname}`}
                state={{ background: location }}
            >
                Написать
            </Link>
        </div>


    )
}

export default FeedbackButtonComponent