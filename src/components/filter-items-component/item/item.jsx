import styles from './item.module.css'
import { useParams, Link, useLocation } from 'react-router-dom';


function Item({ modelCart, vend, chip, devices, recovery_price, refill_price }) {

    const { vendor } = useParams()
    const location = useLocation();
    const locationPathname = location.pathname;
    const img = require(`../../../images/refill/${vendor}/${modelCart}.png`);

    return (
        <Link
            key={modelCart}
            to={`${locationPathname}/${modelCart}`}
            state={{ background: location }}
            className={styles.link}
        >
            <div className={styles.price_row}>
                <img className={styles.image} src={img} alt={modelCart} />
                <p className={styles.model_cart}>{modelCart}</p>
                <p className={styles.vendor}>{vend}</p>
                <p className={styles.chip}>{`${chip ? 'уточняйте' : 'не требуется'}`}</p>
                <p className={styles.devices}>{`${vend} ${devices}`}</p>
                <p className={styles.refill_price}>{refill_price}</p>
                <p className={styles.recovery_price}>{recovery_price}</p>
            </div>
        </Link>
    );
}

export default Item;