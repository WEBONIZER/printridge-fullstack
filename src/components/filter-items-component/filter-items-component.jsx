import Item from './item/item'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './filter-items-component.module.css'

function FilterItemsComponent({ data }) {

    const { vendor } = useParams()
    const filterValue = useSelector((state) => state.filter.value.value);
    const filteredData = data.filter(i => (
        i.modelCart.toLowerCase().includes(filterValue === undefined
            ?
            ''
            :
            filterValue.toLowerCase()))
        ||
        i.devices.toLowerCase().includes(filterValue === undefined
            ?
            ''
            :
            filterValue.toLowerCase()));

    return (
        <div className={styles.price_container}>
            <div className={styles.price_row}>
                <p className={styles.model_cart}>{'Модель картриджа'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.vendor}>{'Модель принтера'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.chip}>{'Замена чипа'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.refill_price}>{'Заправка'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.recovery_price}>{'Восстановление'}</p>
            </div>
            {filteredData && filteredData.map((i, key) => {
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
    );
}

export default FilterItemsComponent;