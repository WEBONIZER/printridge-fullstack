import styles from './item.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FC } from "react";

interface ItemProps {
    modelCart: string;
    vend: string;
    chip: boolean;
    devices: string;
    recovery_price: number;
    refill_price: number;
    examples: string[];
  }
  

const Item: FC<ItemProps> = ({ modelCart, vend, chip, devices, recovery_price, refill_price, examples }) => {
    
    const location = useLocation();
    const locationPathname = location.pathname;

    return (
        <Link
            key={modelCart}
            to={`${locationPathname}/${modelCart}`}
            className={styles.link}
        >
            <div className={styles.price_row}>
                <p className={styles.model_cart}>{`${modelCart.toUpperCase()}`}</p>
                <p className={styles.vendor}>{`${vend.toUpperCase()}`}</p>
                <p className={styles.chip}>{chip ? 'уточняйте' : 'не требуется'}</p>
                <p className={styles.devices}>{`${vend} ${devices}`}</p>
                <p className={styles.refill_price}>{refill_price}</p>
                <p className={styles.recovery_price}>{recovery_price}</p>
            </div>
        </Link>
    );
}

export default Item;