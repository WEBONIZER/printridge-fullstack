import styles from './repair-item.module.css';
import { FC } from "react";
import { Link, useLocation } from 'react-router-dom';

const RepairItem: FC = ({ type, device, vend, model, format, speed, capacity, examples }: any) => {

    const location = useLocation();
    const locationPathname = location.pathname;

    return (
        <Link
            key={model}
            to={`${locationPathname}/${model.replace(/\s/g, '')}`}
            className={styles.link}
        >
            <div className={styles.price_row}>
                <p className={styles.model}>{model}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.type}>{type === 'mono' ? (device === 'printer' ? 'Монохромный' : 'Монохромное') : (device === 'printer' ? 'Цветной' : 'Цветное')}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.device}>{device === 'printer' ? 'Принтер' : 'МФУ'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.format}>{format}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.speed}>{`Скорость ${speed}`}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.capacity}>{`Нагрузка до ${capacity} стр./месяц`}</p>
            </div>
        </Link>
    );
}
 
export default RepairItem;