import styles from './repair-item.module.css';
import { forwardRef } from "react";
import { Link, useLocation } from 'react-router-dom';

interface RepairItemProps {
    printer: {
        _id: string;
        model: string;
        vendor: string;
        type?: string;
        device?: string;
        format?: string;
        speed?: string | number;
        capacity?: string | number;
    };
}

const RepairItem = forwardRef<HTMLAnchorElement, RepairItemProps>(({ printer }, ref) => {
    const location = useLocation();
    const locationPathname = location.pathname;

    const type = printer.type || '';
    const device = printer.device || '';
    const format = printer.format || '';
    const speed = printer.speed ? String(printer.speed) : '';
    const capacity = printer.capacity ? String(printer.capacity) : '';

    const typeText = type === 'mono' 
        ? (device === 'printer' ? 'Монохромный' : 'Монохромное')
        : (device === 'printer' ? 'Цветной' : 'Цветное');
    
    const deviceText = device === 'printer' ? 'Принтер' : 'МФУ';
    const speedText = speed ? `Скорость ${speed}` : '';
    const capacityText = capacity ? `Нагрузка до ${capacity} стр./месяц` : '';

    return (
        <Link
            ref={ref}
            to={`${locationPathname}/${printer.model.replace(/\s/g, '')}`}
            className={styles.link}
        >
            <div className={styles.price_row}>
                <p className={styles.model}>{printer.model}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.type}>{typeText}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.device}>{deviceText}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.format}>{format}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.speed}>{speedText}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.capacity}>{capacityText}</p>
            </div>
        </Link>
    );
});

RepairItem.displayName = 'RepairItem';

export default RepairItem;
