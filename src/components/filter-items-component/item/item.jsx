import styles from './item.module.css'
import { NavLink } from 'react-router-dom';


function Item({ modelCart, vendor, chip, devices, recovery_price, refill_price }) {
    console.log(vendor)
    return (
        <div className={styles.price_row}>
            <p>{modelCart}</p>
            <p>{vendor}</p>
            <p>{chip}</p>
            <p>{devices}</p>
            <p>{recovery_price}</p>
            <p>{refill_price}</p>


        </div>
    );
}

export default Item;