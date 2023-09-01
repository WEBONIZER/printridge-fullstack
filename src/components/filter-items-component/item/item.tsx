import styles from './item.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FC } from "react";

const Item: FC = ({ modelCart, vend, chip, devices, recovery_price, refill_price, examples }: any) => {
    
    const location = useLocation();
    const locationPathname = location.pathname;

    return (
        <Link
            key={modelCart}
            to={`${locationPathname}/${modelCart}`}
            className={styles.link}
        >
            <div className={styles.price_row}>
                <p className={styles.model_cart}>{modelCart}</p>
                <p className={styles.vendor}>{vend}</p>
                <p className={styles.chip}>{chip ? 'уточняйте' : 'не требуется'}</p>
                <p className={styles.devices}>{`${vend} ${devices}`}</p>
                <p className={styles.refill_price}>{refill_price}</p>
                <p className={styles.recovery_price}>{recovery_price}</p>
            </div>
        </Link>
    );
}

export default Item;