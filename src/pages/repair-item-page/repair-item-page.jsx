import styles from './repair-item-page.module.css'
import RepairItemComponent from '../../components/repair-component/repair-item-component/repair-item-component'
import { VendorMenuRepair } from '../../components/vendor-menu/vendor-menu-reoair/vendor-menu-repair'

function RepairItemPage() {

    return (

        <div className={styles.box}>
            <VendorMenuRepair />
            <RepairItemComponent />
        </div>


    );
}

export default RepairItemPage;