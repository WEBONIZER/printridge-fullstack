import RepairItem from '../item/repair-item/repair-item'
import { useParams } from "react-router-dom";
import { Filter } from '../../filter/filter'
import { useSelector } from "react-redux";
import styles from './repair-items-component.module.css'

function RepairItemsComponent({ data }) {

    const { vendor } = useParams()
    const filterValue = useSelector((state) => state.filter.value.value);
    const filteredData = data.filter(i => (
        i.model.toLowerCase().includes(filterValue === undefined
            ?
            ''
            :
            filterValue.toLowerCase()))
        ||
        i.vendor.toLowerCase().includes(filterValue === undefined
            ?
            ''
            :
            filterValue.toLowerCase()));

    return (
        <div className={styles.price_container}>
            <div className={styles.price_row}>
                <p className={styles.model}>{'Устройство'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.type}>{'Способ печати'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.device}>{'Устройство'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.format}>{'Формат'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.speed}>{'Скорость'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.capacity}>{'Нагрузка'}</p>
            </div>
            {filteredData.map((i, key) => {
                return (
                    <RepairItem
                        type={i.type}
                        device={i.device}
                        vend={i.vendor}
                        model={i.model}
                        format={i.format}
                        speed={i.speed}
                        capacity={i.capacity}
                        key={key}
                        examples={i.examples}
                    />
                )
            })}
        </div>
    )
}

export default RepairItemsComponent;