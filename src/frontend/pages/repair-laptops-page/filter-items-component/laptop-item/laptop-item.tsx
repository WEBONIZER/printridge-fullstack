import styles from './laptop-item.module.css';
import { FC, forwardRef } from "react";
import { Link, useLocation } from 'react-router-dom';

interface LaptopItemProps {
    laptop: {
        _id: string;
        vendor: string;
        model: string;
        series?: string;
        processorVendor?: string;
        processorName?: string;
        display?: number;
        ram?: number;
        ramType?: string;
    };
}

const LaptopItem: FC<LaptopItemProps> = forwardRef<HTMLAnchorElement, LaptopItemProps>(({ laptop }, ref) => {
    const location = useLocation();
    const locationPathname = location.pathname;

    const modelUrl = (laptop.model || '').replace(/\s/g, '');
    const processorText = laptop.processorVendor 
        ? (laptop.processorName ? `${laptop.processorVendor} ${laptop.processorName}` : laptop.processorVendor)
        : '';
    const displayText = laptop.display ? `${laptop.display} "` : '';
    const ramText = laptop.ram ? `${laptop.ram} Гб` : '';

    return (
        <Link
            ref={ref}
            to={`${locationPathname}/${modelUrl}`}
            className={styles.link}
        >
            <div className={styles.price_row}>
                <p className={styles.vendor}>{(laptop.vendor || '').toUpperCase()}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.model}>{laptop.model || ''}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.processorVendor}>{processorText}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.display}>{displayText}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.ram}>{ramText}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.ramType}>{laptop.ramType || ''}</p>
            </div>
        </Link>
    );
});

LaptopItem.displayName = 'LaptopItem';
 
export default LaptopItem;

