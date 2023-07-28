import styles from './repair-item.module.css';
import { useParams, Link, useLocation } from 'react-router-dom';

function RepairItem({ type, device, vend, model, format, speed, capacity, examples }) {
    const images = require.context('../../../../images/repair', true);
    const { vendor } = useParams();
    const location = useLocation();
    const locationPathname = location.pathname;
    const img = images.keys().includes(`./${vendor}/${model}.png`) ? images(`./${vendor}/${model}.png`) : null;

    return (
        <Link
            key={model}
            to={`${locationPathname}/${model.replace(/\s/g, '')}`}
            state={{ background: location }}
            className={styles.link}
        >
            <div className={styles.price_row}>
                <p className={styles.type}>{type === 'mono' ? (device === 'printer' ? 'Монохромный' : 'Монохромное') : (device === 'printer' ? 'Цветной' : 'Цветное')}</p>
                <p className={styles.device}>{device === 'printer' ? 'принтер' : 'МФУ'}</p>
                <p className={styles.vend}>{`${vend.toUpperCase()}`}</p>
                <p className={styles.model}>{model}</p>
                <p className={styles.format}>{format}</p>
                <p className={styles.speed}>{`Скорость ${speed}`}</p>
                <p className={styles.capacity}>{`Нагрузка до ${capacity} стр./месяц`}</p>
            </div>
        </Link>
    );
}

export default RepairItem;