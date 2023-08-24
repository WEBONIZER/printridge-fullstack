import styles from './footer.module.css'

function FooterComponent() {

    return (
        <div className={styles.footer}>
            <div className={styles.footer_box}>
                <p>Карта</p>
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Auga0_ks-D3ak0vpXW1nfm9qGWBf_9R73&amp;source=constructor" width="95%" height="280px" frameBorder="1"></iframe>
            </div>
            <div className={styles.footer_box}>
                <p>Соцсети</p>
            </div>
            <div className={styles.footer_box}>
                <p>Что-то ещё</p>
            </div>
        </div>
    );
}

export default FooterComponent;