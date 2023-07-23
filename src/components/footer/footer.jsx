import styles from './footer.module.css'

function FooterComponent() {

    return (
        <div className={styles.footer}>
            <p className={styles.footer_box}>
                Карта
                <div>
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Auga0_ks-D3ak0vpXW1nfm9qGWBf_9R73&amp;source=constructor" width="95%" height="280px" frameborder="1"></iframe>
                </div>
            </p>
            <p className={styles.footer_box}>
                Соцсети
            </p>
            <p className={styles.footer_box}>
                Что-то ещё
            </p>
        </div>
    );
}

export default FooterComponent;