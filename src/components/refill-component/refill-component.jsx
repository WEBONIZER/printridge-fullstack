import styles from './refill-component.module.css'
import { useLocation, useParams } from 'react-router-dom';
import FilterItemsComponent from '../filter-items-component/filter-items-component'
import { refillData } from '../../utils/refill'
import { VendorMenu } from '../vendor-menu/vendor-menu'

function RefillComponent() {
    const { vendor } = useParams()
    const location = useLocation();
    const locationPathname = location.pathname.substring(8);
    const filterCategory = refillData.filter((i) => i.vendor.toLowerCase() === locationPathname)
    //console.log(locationPathname)

    return (
        < div className={styles.container}>
        <VendorMenu />
        <div className={styles.price_container}>
            <FilterItemsComponent data={filterCategory} />
        </div>
        </div>
    );
}

export default RefillComponent;