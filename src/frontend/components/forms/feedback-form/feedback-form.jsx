import styles from './feedback-form.module.css'
import { useLocation } from 'react-router-dom'

export const FeedbackForm = () => {

    const location = useLocation();
    const link = location.state.background.pathname
    const service = link.includes('repair') ? 'ремонт принтера' : link.includes('refill') ? 'заправку картриджа' : null;

    return (
        <div className={styles.conteiner}>
            <h2 className={styles.title}>Напишите нам</h2>
            <p>{`Вы хотите заказать ${service}?`}</p>
            <div className={styles.nputs_conteiner}>
                <input type="text" placeholder="Введите ваше имя" name="username" required />
                <input type="email" placeholder="Введите ваш e-mail" />
                <input type="tel" placeholder="Введите ваш номер телефона" />
                <textarea rows="8" cols="50" placeholder="Введите текст" name="description" required></textarea>
            </div>
            <button className={styles.button}>
                Отправить
            </button>
        </div>
    )
}