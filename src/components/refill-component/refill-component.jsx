import styles from './refill-component.module.css'
import { Navigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import FilterItemsComponent from '../filter-items-component/filter-items-component'
import { refillData } from '../../utils/refill'
import { VendorMenu } from '../vendor-menu/vendor-menu'
import { Filter } from '../filter/filter'
import { Helmet } from "react-helmet";

function RefillComponent() {

    const { vendor } = useParams()
    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;
    const filterCategory = refillData.filter((i) => i.vendor === vendor)

    const img = `https://storage.yandexcloud.net/printridge/logo_no_back_color_invert.png`;

    return (filterCategory.length > 0 &&
        <>
            <Helmet>
                <title>{`Заправка картриджей ${vendor.toUpperCase()}`}</title>
                <meta name="title" content={`Заправка картриджей ${vendor.toUpperCase()}`} />
                <meta
                    name="keywords"
                    content={`заправка картриджей ${vendor.toUpperCase()}, заправить картридж ${vendor.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`Стоимость заправки картриджей ${vendor.toUpperCase()}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`Заправка картриджей ${vendor.toUpperCase()}`} />
                <meta property="og:description" content={`Стоимость заправки картриджей ${vendor.toUpperCase()}`} />
                <meta property="og:image" content={<img
                    className={styles.image}
                    src={img}
                    alt={`Заправка картриджей ${vendor}`}
                />} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            < div className={styles.container}>
                <div className={styles.title_box}>
                    <p className={styles.description}>Выберите производителя и модель картриджа</p>
                </div>
                <VendorMenu />
                <Filter />
                <FilterItemsComponent data={filterCategory} />
            </div>
        </>
    );
}

export default RefillComponent;