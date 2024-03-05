import styles from './refill-component.module.css'
import { useParams } from 'react-router-dom';
import FilterItemsComponent from '../filter-items-component/filter-items-component'
import { refillData } from '../../utils/refill'
import { VendorMenu } from '../vendor-menu/vendor-menu'
import { Filter } from '../filter/filter'
import { useEffect } from 'react';

function RefillComponent() {

    const { vendor } = useParams()
    const filterCategory = refillData.filter((i) => i.vendor === vendor)

    useEffect(() => {
        document.title = `Заправка картриджей ${vendor.toUpperCase()}`;
        document.querySelector('meta[name="title"]').setAttribute('content', `Заправка картриджей ${vendor.toUpperCase()}`);
        document.querySelector('meta[name="description"]').setAttribute('content', `Стоимость заправки картриджей ${vendor.toUpperCase()}`);
    }, [vendor]);

    return (
        < div className={styles.container}>
            <div className={styles.title_box}>
                <p className={styles.description}>Выберите производителя и модель картриджа</p>
            </div>
            <VendorMenu />
            <Filter />
            <FilterItemsComponent data={filterCategory} />
        </div>
    );
}

export default RefillComponent;