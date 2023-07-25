import styles from './header.module.css'
import { NavLink } from 'react-router-dom';
import giraffeImg from '../../images/giraffe.png';

function HeaderComponent() {
    return (
        <div className={styles.container}>
            <div className={styles.logo_container}>
                <div className={styles.info_box}>
                    <NavLink
                        className={styles.link}
                        to="/"
                    >
                        <h1 className={styles.header}>ПРИНТРИДЖ</h1>
                    </NavLink>
                    <div>
                        <p>
                            89516878803
                        </p>
                        <p>
                            Обуховской обороны, 116к1, лит. Е, оф. 408
                        </p>
                    </div>
                </div>
                <NavLink
                    className={styles.link}
                    to="/"
                >
                    <img
                        className={styles.giraffe}
                        src={giraffeImg}
                        alt=""
                    />
                </NavLink>
            </div>
            <div className={styles.info_box}>
                <div></div>

            </div>
        </div>
    );
}

export default HeaderComponent;