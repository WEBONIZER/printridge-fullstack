import styles from './not-found.module.css'

function NotFound404() {

    return (
        <div className={styles.container}>
            <div className={styles.info_box}>
                <h2 className={styles.title}>404 - Страница не найдена</h2>
            </div>
        </div>
    );
}

export default NotFound404;