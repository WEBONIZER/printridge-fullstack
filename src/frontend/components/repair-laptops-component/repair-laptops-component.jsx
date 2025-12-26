import styles from './repair-laptops-component.module.css'
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilterLaptopsComponent from './filter-items-component/filter-laptops-component'
import VendorMenuLaptops from '../vendor-menu/vendor-menu-laptops/vendor-menu-laptops'
import { Filter } from '../filter/filter'
import { Helmet } from "react-helmet";
import { getPaginatedLaptops } from '../../utils/api';
import Spinner from '../spinner/spinner';

function RepairLaptopsComponent() {

    const { vendor } = useParams()
    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;
    const filterValue = useSelector((state) => {
        const value = state.filter?.value?.value;
        return typeof value === 'string' ? value : '';
    });
    const [laptops, setLaptops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterDebounce, setFilterDebounce] = useState('');
    const limit = 30;

    const img = `https://storage.yandexcloud.net/printridge/logo_no_back_color_invert.png`;

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilterDebounce(filterValue);
        }, 500);

        return () => clearTimeout(timer);
    }, [filterValue]);

    useEffect(() => {
        loadLaptops(true);
    }, [vendor, filterDebounce]);

    const loadLaptops = async (reset = false) => {
        if (reset) {
            setLaptops([]);
            setCurrentPage(1);
            setIsLoading(true);
            if (isInitialLoad) {
                setIsInitialLoad(false);
            }
        } else {
            setIsLoading(true);
        }

        try {
            const pageToLoad = reset ? 1 : currentPage;
            const response = await getPaginatedLaptops({
                page: pageToLoad,
                limit,
                vendor: vendor || undefined,
                model: filterDebounce.trim() || undefined,
                public: 'true'
            });

            const filteredData = response.data.filter(laptop => laptop.public !== false);
            
            if (reset) {
                setLaptops(filteredData);
            } else {
                setLaptops(prev => [...prev, ...filteredData]);
            }

            setHasMore(response.data.length === limit && response.pagination.currentPage < response.pagination.totalPages);
            if (!reset) {
                setCurrentPage(prev => prev + 1);
            } else {
                setCurrentPage(2);
            }
        } catch (error) {
            console.error('Ошибка загрузки ноутбуков:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            loadLaptops(false);
        }
    };

    if (isInitialLoad && isLoading && laptops.length === 0) {
        return <Spinner />;
    }

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
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`Ремонт ноутбуков ${vendor.toUpperCase()}`} />
                <meta property="og:description" content={`Прайс по ремонту ноутбуков ${vendor.toUpperCase()}`} />
                <meta property="og:image" content={img} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div className={styles.container}>
                <div className={styles.title_box}>
                    <p className={styles.description}>Выберите производителя и модель ноутбука</p>
                </div>
                <VendorMenuLaptops />
                <Filter />
                <FilterLaptopsComponent 
                    data={laptops} 
                    onLoadMore={handleLoadMore}
                    hasMore={hasMore}
                    isLoading={isLoading}
                />
            </div>
        </>
    );
}

export default RepairLaptopsComponent;