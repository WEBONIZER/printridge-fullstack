import styles from './footer.module.css'

function FooterComponent() {

    return (
        <div className={styles.footer}>
            <p className={styles.footer_box}>
                Карта
            </p>
            <p className={styles.footer_box}>
                Соцсети
            </p>
            <p className={styles.footer_box}>
                Что-то ещё
            </p>
            <p className={styles.footer_box}>
                Что-то ещё
            </p>
        </div>
    );
}

export default FooterComponent;