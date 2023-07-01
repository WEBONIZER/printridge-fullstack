import styles from './filter-items-component.module.css'
import { NavLink } from 'react-router-dom';
import Item from './item/item'


function FilterItemsComponent({ data }) {

    const refillItems = data.filter((i) =>
        i.modelCart
    )

    const repairItems = data.filter((i) =>
        i.modelPrint
    )

    return (
        refillItems.map((i) => {
            return (
            <Item
                modelCart={i.modelCart}
                vendor={i.vendor}
                chip={i.chip}
                devices={i.devices}
                recovery_price={i.recovery_price}
                refill_price={i.refill_price}
                
            />
            )
        })
    );
}

export default FilterItemsComponent;