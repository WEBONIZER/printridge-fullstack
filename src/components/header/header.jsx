import styles from './header.module.css'
import { NavLink } from 'react-router-dom';

function HeaderComponent() {

    return (
        <div className={styles.container}>
            <NavLink
                className={styles.link}
                to="/"
            >
                <h1 className={styles.header}>ПРИНТРИДЖ</h1>
            </NavLink>
            <div className={styles.info_box}>
                <div></div>
                <div>
                    <p>
                        89516878803
                    </p>
                    <p>
                        Обуховской обороны, 116к1, лит. Е, оф. 408
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HeaderComponent;