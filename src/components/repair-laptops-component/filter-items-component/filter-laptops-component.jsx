import LaptopItem from './laptop-item/laptop-item'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './filter-laptops-component.module.css'

function FilterLaptopsComponent({ data }) {

    const { vendor } = useParams()
    const filterValue = useSelector((state) => state.filter.value.value);
    const filteredData = data.filter(i => (
        i.model.toLowerCase().includes(filterValue === undefined
            ?
            ''
            :
            filterValue.toLowerCase()))
        ||
        i.series.toLowerCase().includes(filterValue === undefined
            ?
            ''
            :
            filterValue.toLowerCase()));

    return (
        <div className={styles.price_container}>
            <div className={styles.price_row}>
                <p className={styles.vendor}>{'Производитель'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.model}>{'Модель'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.processorVendor}>{'Процессор'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.display}>{'Диагональ'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.ram}>{'Память'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.ramType}>{'Тип памяти'}</p>
            </div>
            {filteredData.map((i, key) => {
                return (
                    <LaptopItem
                        vend={i.vendor}
                        processorVendor={i.processorVendor}
                        model={i.model}
                        display={i.display}
                        ram={i.ram}
                        ramType={i.ramType}
                    />
                )
            })}
        </div>
    )
}

export default FilterLaptopsComponent;