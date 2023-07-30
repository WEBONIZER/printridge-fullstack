import RepairItem from '../item/repair-item/repair-item'
import { useParams } from "react-router-dom";
import { Filter } from '../../filter/filter'
import React from "react";
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
    //console.log(data)
    return (vendor !== undefined ? (
        <div className={styles.container}>
            <h2>
                Ремонт принтеров {vendor === undefined ? '' : vendor.toUpperCase()}
            </h2>
            {vendor !== undefined && <Filter />}
            <div className={styles.price_container}>
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
        </div>)
        :
        <div>
            <h3>
                Зачем нужен ремонт принтеро?
            </h3>
            <p>
                Ремонт принтеров нужен чтобы отремонтировать принтер
            </p>
        </div>
    );
}

export default RepairItemsComponent;