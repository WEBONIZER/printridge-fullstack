import styles from './spinner.module.css'
import { FC } from 'react';

export const Spinner: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
        </div>
    );
}

