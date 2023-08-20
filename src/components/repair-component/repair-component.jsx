import styles from './repair-component.module.css'
import { useLocation, useParams } from 'react-router-dom';
import RepairItemsComponent from '../filter-items-component/repair-items-component/repair-items-component'
import { repair } from '../../utils/repair'
import { VendorMenuRepair } from '../vendor-menu/vendor-menu-reoair/vendor-menu-repair'

function RepairComponent() {
    const { vendor } = useParams()
   // const location = useLocation();
   // const locationPathname = location.pathname.substring(8);
    const filterCategory = repair.filter((i) => i.vendor === vendor)
    console.log(vendor)
    return (
        < div className={styles.container}>
            <VendorMenuRepair />
            <div className={styles.price_container}>
                <RepairItemsComponent data={filterCategory} />
            </div>
        </div>
    );
}

export default RepairComponent;