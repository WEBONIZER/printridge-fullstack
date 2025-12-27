import styles from './navigate.module.css'
import { VendorMenu } from '../../components/vendor-menu/vendor-menu.tsx'
import { VendorMenuRepair } from '../../components/vendor-menu/vendor-menu-reoair/vendor-menu-repair.tsx'
import { useLocation } from 'react-router-dom';
import { FC } from 'react';

export const NavigationMenu: FC = () => {

    const location = useLocation();

    return (
        <div className={styles.container}>
            {location.pathname.includes('refill') ? <VendorMenu /> : location.pathname.includes('repair') ? <VendorMenuRepair /> : '' }
        </div>
    );
}

