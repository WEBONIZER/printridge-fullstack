import styles from './refill-component.module.css'
import { useLocation } from 'react-router-dom';
import FilterItemsComponent from '../filter-items-component/filter-items-component'
import { refillData } from '../../utils/refill'
import { VendorMenu } from '../vendor-menu/vendor-menu'

function RefillComponent() {

    const location = useLocation();
    const locationPathname = location.pathname.substring(8);
    const filterCategory = refillData.filter((i) => i.vendor.toLowerCase() === locationPathname)

    return (
        <div className={styles.price_container}>
            <VendorMenu />
            <FilterItemsComponent data={filterCategory} />
        </div>
    );
}

export default RefillComponent;