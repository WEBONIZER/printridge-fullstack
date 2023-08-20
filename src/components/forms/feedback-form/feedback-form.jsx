import styles from './feedback-form.module.css'

const FeedbackForm = () => {

    return (
        <div className={styles.conteiner}>
            <h2 className={styles.title}>Напишите нам</h2>
            <div className={styles.nputs_conteiner}>
                <input type="text" placeholder="Введите ваше имя" name="username" value="" required />
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

export default FeedbackForm