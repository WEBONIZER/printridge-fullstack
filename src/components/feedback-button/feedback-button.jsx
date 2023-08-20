import styles from './feedback-button.module.css'
import { useLocation, Link, Location } from 'react-router-dom'

const FeedbackButton = () => {

    const location = useLocation();

    return (
        <Link
        //key={item._id}
        to='/'
        state={{ background: location }}
        //className={style.link}
      >
        <button className={styles.container}>
            <p>Обратная связь</p>
        </button>
        </Link>

    )
}

export default FeedbackButton