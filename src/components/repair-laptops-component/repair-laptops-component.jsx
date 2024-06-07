import styles from './repair-laptops-component.module.css'
import { Navigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import FilterLaptopsComponent from './filter-items-component/filter-laptops-component'
import VendorMenuLaptops from '../vendor-menu/vendor-menu-laptops/vendor-menu-laptops'
import { repairLaptops } from '../../utils/laptops'
import { Filter } from '../filter/filter'
import { Helmet } from "react-helmet";

function RepairLaptopsComponent() {

    const { vendor } = useParams()
    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;
    const filterCategory = repairLaptops.filter((i) => i.vendor === vendor)

    return (
        <>
            <Helmet>
                <title>{`Ремонт ноутбуков ${vendor.toUpperCase()}`}</title>
                <meta name="title" content={`Ремонт ноутбуков ${vendor.toUpperCase()}`} />
                <meta
                    name="keywords"
                    content={`ремонт ноутбуков ${vendor.toUpperCase()}, чистка ноутбуков ${vendor.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`Прайс по ремонту ноутбуков ${vendor.toUpperCase()}`}
                />
            </Helmet>
            < div className={styles.container}>
                <div className={styles.title_box}>
                    <p className={styles.description}>Выберите производителя и модель ноутбука</p>
                </div>
                <VendorMenuLaptops />
                <Filter />
                <FilterLaptopsComponent data={filterCategory} />
            </div>
        </>
    );
}

export default RepairLaptopsComponent;