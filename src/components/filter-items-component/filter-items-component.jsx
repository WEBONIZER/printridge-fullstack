import Item from './item/item'
import { useParams } from "react-router-dom";
import { Filter } from '../filter/filter'
import React from "react";
import { useSelector } from "react-redux";
import styles from './filter-items-component.module.css'

function FilterItemsComponent({ data }) {
    const {vendor} = useParams()
    const filterValue = useSelector((state) => state.filter.value.value);
    const filteredData = data.filter(i => i.modelCart.toLowerCase().includes(filterValue === undefined ? '' : filterValue.toLowerCase()))

    return (
        <div className={styles.container}>
            <h2>
                Заправка картриджей {vendor === undefined ? '' : vendor.toUpperCase()}
            </h2>
            <Filter />
            <div className={styles.price_container}>
            {filteredData.map((i, key) => {
                return (
                    <Item
                        modelCart={i.modelCart}
                        vend={i.vendor}
                        chip={i.chip}
                        devices={i.devices}
                        recovery_price={i.recovery_price}
                        refill_price={i.refill_price}
                        key={key}
                        examples={i.examples}
                    />
                )
            })}
            </div>
        </div>
    );
}

export default FilterItemsComponent;