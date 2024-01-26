import styles from './navigate.module.css'
import { VendorMenu } from '../../components/vendor-menu/vendor-menu'
import { VendorMenuRepair } from '../../components/vendor-menu/vendor-menu-reoair/vendor-menu-repair'
import { useLocation } from 'react-router-dom';

function NavigationMenu() {

    const location = useLocation();

    return (
        <div className={styles.container}>
            {location.pathname.includes('refill') ? <VendorMenu /> : location.pathname.includes('repair') ? <VendorMenuRepair /> : '' }
        </div>
    );
}

export default NavigationMenu;