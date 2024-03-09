import styles from './laptop-item.module.css';
import { FC } from "react";
import { Link, useLocation } from 'react-router-dom';

const LaptopItem: FC = ({ vend, processorVendor, model, display, ram, ramType }: any) => {

    const location = useLocation();
    const locationPathname = location.pathname;

    return (
        <Link
            key={model}
            to={`${locationPathname}/${model.replace(/\s/g, '')}`}
            className={styles.link}
        >
            <div className={styles.price_row}>
                <p className={styles.vendor}>{vend.toUpperCase()}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.model}>{model}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.processorVendor}>{processorVendor}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.display}>{display}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.ram}>{ram}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.ramType}>{ramType}</p>
            </div>
        </Link>
    );
}
 
export default LaptopItem;