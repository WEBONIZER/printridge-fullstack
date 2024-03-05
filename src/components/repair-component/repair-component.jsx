import styles from './repair-component.module.css'
import { useParams } from 'react-router-dom';
import RepairItemsComponent from '../filter-items-component/repair-items-component/repair-items-component'
import VendorMenuRepair from '../vendor-menu/vendor-menu-reoair/vendor-menu-repair'
import { repair } from '../../utils/repair'
import { Filter } from '../filter/filter'
import { useEffect } from 'react';

function RepairComponent() {

    const { vendor } = useParams()
    const filterCategory = repair.filter((i) => i.vendor === vendor)

    useEffect(() => {
        document.title = `Ремонт принтеров и МФУ ${vendor.toUpperCase()}`;
        document.querySelector('meta[name="title"]').setAttribute('content', `Ремонт принтеров и МФУ ${vendor.toUpperCase()}`);
        document.querySelector('meta[name="description"]').setAttribute('content', `Прайс по ремонту принтеров и МФУ ${vendor.toUpperCase()}`);
    }, [vendor]);

    return (
        < div className={styles.container}>
            <div className={styles.title_box}>
                <p className={styles.description}>Выберите производителя и модель принтера</p>
            </div>
            <VendorMenuRepair />
            <Filter />
            <RepairItemsComponent data={filterCategory} />
        </div>
    );
}

export default RepairComponent;