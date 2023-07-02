import styles from './refill-item-page.module.css'
import RefillItemComponent from '../../components/refill-component/refill-item-component/refill-item-component'
import { VendorMenu } from '../../components/vendor-menu/vendor-menu'

function RefillItemPage() {

    return (

        <div className={styles.box}>
            <VendorMenu />
            <RefillItemComponent />
        </div>


    );
}

export default RefillItemPage;