import styles from './repair-component.module.css'
import { Navigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import RepairItemsComponent from '../filter-items-component/repair-items-component/repair-items-component'
import VendorMenuRepair from '../vendor-menu/vendor-menu-reoair/vendor-menu-repair'
import { repair } from '../../utils/repair'
import { Filter } from '../filter/filter'
import { useEffect } from 'react';

function RepairComponent() {

    const { vendor } = useParams()
    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;
    const filterCategory = repair.filter((i) => i.vendor === vendor)

    useEffect(() => {
        document.querySelector('link[rel="canonical"]').setAttribute('href', canonicalUrl);
        document.title = `Ремонт принтеров и МФУ ${vendor.toUpperCase()}`;
        document.querySelector('meta[name="title"]').setAttribute('content', `Ремонт принтеров и МФУ ${vendor.toUpperCase()}`);
        document.querySelector('meta[name="description"]').setAttribute('content', `Прайс по ремонту принтеров и МФУ ${vendor.toUpperCase()}`);
        document.querySelector('meta[name="keywords"]').setAttribute('content', `ремонт принтеров и МФУ ${vendor.toUpperCase()}, техническое обслуживание принтеров и МФУ ${vendor.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`);
    }, [vendor]);

    return (filterCategory.length > 0 ?
        < div className={styles.container}>
            <div className={styles.title_box}>
                <p className={styles.description}>Выберите производителя и модель принтера</p>
            </div>
            <VendorMenuRepair />
            <Filter />
            <RepairItemsComponent data={filterCategory} />
        </div> :
        <Navigate to="/404" replace />
    );
}

export default RepairComponent;