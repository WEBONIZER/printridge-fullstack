import styles from './feedback-button.module.css'
import { useLocation, Link } from 'react-router-dom'

const FeedbackButton = () => {

    const location = useLocation();

    return (
        <Link
        to='/'
        state={{ background: location }}
      >
        <button className={styles.container}>
            <p>Обратная связь</p>
        </button>
        </Link>

    )
}

export default FeedbackButton