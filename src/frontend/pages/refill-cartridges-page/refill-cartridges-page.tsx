import styles from './refill-cartridges-page.module.css'
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilterItemsComponent from '../../components/filter-items-component/filter-items-component'
import { VendorMenu } from '../../components/vendor-menu/vendor-menu'
import { Filter } from '../../components/filter/filter'
import { Helmet } from "react-helmet";
import { getPaginatedCartridges, Cartridge } from '../../utils/api';
import Spinner from '../../components/spinner/spinner';

function RefillCartridgesPage() {

    const { vendor } = useParams()
    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;
    const filterValue = useSelector((state: any) => {
        const value = state.filter?.value?.value;
        return typeof value === 'string' ? value : '';
    });
    const [cartridges, setCartridges] = useState<Cartridge[]>([]);
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
        loadCartridges(true);
    }, [vendor, filterDebounce]);

    const loadCartridges = async (reset = false) => {
        if (reset) {
            setCartridges([]);
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
            const response = await getPaginatedCartridges({
                page: pageToLoad,
                limit,
                vendor: vendor || undefined,
                modelCart: filterDebounce.trim() || undefined,
                public: 'true'
            });

            const filteredData = response.data.filter(cartridge => cartridge.public !== false);
            
            if (reset) {
                setCartridges(filteredData);
            } else {
                setCartridges(prev => [...prev, ...filteredData]);
            }

            setHasMore(response.data.length === limit && response.pagination.currentPage < response.pagination.totalPages);
            if (!reset) {
                setCurrentPage(prev => prev + 1);
            } else {
                setCurrentPage(2);
            }
        } catch (error) {
            console.error('Ошибка загрузки картриджей:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            loadCartridges(false);
        }
    };

    if (isInitialLoad && isLoading && cartridges.length === 0) {
        return <Spinner />;
    }

    return (
        <>
            <Helmet>
                <title>{`Заправка картриджей ${vendor?.toUpperCase() || ''}`}</title>
                <meta name="title" content={`Заправка картриджей ${vendor?.toUpperCase() || ''}`} />
                <meta
                    name="keywords"
                    content={`заправка картриджей ${vendor?.toUpperCase() || ''}, заправить картридж ${vendor?.toUpperCase() || ''}, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`Стоимость заправки картриджей ${vendor?.toUpperCase() || ''}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`Заправка картриджей ${vendor?.toUpperCase() || ''}`} />
                <meta property="og:description" content={`Стоимость заправки картриджей ${vendor?.toUpperCase() || ''}`} />
                <meta property="og:image" content={img} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div className={styles.container}>
                <div className={styles.title_box}>
                    <p className={styles.description}>Выберите производителя и модель картриджа</p>
                </div>
                <VendorMenu />
                <Filter />
                <FilterItemsComponent 
                    data={cartridges} 
                    onLoadMore={handleLoadMore}
                    hasMore={hasMore}
                    isLoading={isLoading}
                />
            </div>
        </>
    );
}

export default RefillCartridgesPage;

