import styles from './refill-component.module.css'
import { useParams } from 'react-router-dom';
import FilterItemsComponent from '../filter-items-component/filter-items-component'
import { refillData } from '../../utils/refill'
import { VendorMenu } from '../vendor-menu/vendor-menu'
import { Filter } from '../filter/filter'

function RefillComponent() {

    const { vendor } = useParams()
    const filterCategory = refillData.filter((i) => i.vendor === vendor)

    return (
        < div className={styles.container}>
            <div className={styles.title_box}>
                <h2 className={styles.title}>
                    Заправка картриджей {vendor === undefined ? '' : vendor.toUpperCase()}
                </h2>
                <p className={styles.description}>Выберите производителя и модель картриджа</p>
            </div>
            <VendorMenu />
            <Filter />
            <FilterItemsComponent data={filterCategory} />
        </div>
    );
}

export default RefillComponent;