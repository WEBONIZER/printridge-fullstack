import Item from './item/item'
import { useParams } from "react-router-dom";

function FilterItemsComponent({ data }) {
    
    return (
        data.map((i, key) => {
            return (
            <Item
                modelCart={i.modelCart}
                vend={i.vendor}
                chip={i.chip}
                devices={i.devices}
                recovery_price={i.recovery_price}
                refill_price={i.refill_price}
                key={key}
                
            />
            )
        })
    );
}

export default FilterItemsComponent;