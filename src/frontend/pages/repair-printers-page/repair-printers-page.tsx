import styles from './repair-printers-page.module.css'
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RepairItemsComponent } from '../../components/filter-items-component/repair-items-component/repair-items-component'
import { VendorMenuRepair } from '../../components/vendor-menu/vendor-menu-reoair/vendor-menu-repair.tsx'
import { Filter } from '../../components/filter/filter'
import { Helmet } from "react-helmet";
import { getPaginatedPrinters, Printer } from '../../utils/api';
import { Spinner } from '../../components/spinner/spinner';

function RepairPrintersPage() {

    const { vendor } = useParams()
    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;
    const filterValue = useSelector((state: any) => {
        const value = state.filter?.value;
        return typeof value === 'string' ? value : '';
    });
    const [printers, setPrinters] = useState<Printer[]>([]);
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

    const currentPageRef = useRef(currentPage);
    
    useEffect(() => {
        currentPageRef.current = currentPage;
    }, [currentPage]);

    const loadPrinters = useCallback(async (reset = false, page?: number) => {
        if (reset) {
            setPrinters([]);
            setCurrentPage(1);
            setIsLoading(true);
            if (isInitialLoad) {
                setIsInitialLoad(false);
            }
        } else {
            setIsLoading(true);
        }

        try {
            const pageToLoad = page !== undefined ? page : (reset ? 1 : currentPageRef.current);
            const response = await getPaginatedPrinters({
                page: pageToLoad,
                limit,
                vendor: vendor || undefined,
                model: filterDebounce.trim() || undefined,
                public: 'true'
            });

            const filteredData = response.data.filter(printer => printer.public !== false);
            
            if (reset) {
                setPrinters(filteredData);
                setCurrentPage(2);
            } else {
                setPrinters(prev => [...prev, ...filteredData]);
                setCurrentPage(prev => prev + 1);
            }

            setHasMore(response.data.length === limit && response.pagination.currentPage < response.pagination.totalPages);
        } catch (error) {
            console.error('Ошибка загрузки принтеров:', error);
        } finally {
            setIsLoading(false);
        }
    }, [vendor, filterDebounce, isInitialLoad]);

    useEffect(() => {
        loadPrinters(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vendor, filterDebounce]);

    const handleLoadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            loadPrinters(false, currentPageRef.current);
        }
    }, [isLoading, hasMore, loadPrinters]);

    if (isInitialLoad && isLoading && printers.length === 0) {
        return <Spinner />;
    }

    return (
        <>
            <Helmet>
                <title>{`Ремонт принтеров и МФУ ${vendor?.toUpperCase() || ''}`}</title>
                <meta name="title" content={`Ремонт принтеров и МФУ ${vendor?.toUpperCase() || ''}`} />
                <meta
                    name="keywords"
                    content={`ремонт принтеров и МФУ ${vendor?.toUpperCase() || ''}, техническое обслуживание принтеров и МФУ ${vendor?.toUpperCase() || ''}, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`Прайс по ремонту принтеров и МФУ ${vendor?.toUpperCase() || ''}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`Ремонт принтеров и МФУ ${vendor?.toUpperCase() || ''}`} />
                <meta property="og:description" content={`Прайс по ремонту принтеров и МФУ ${vendor?.toUpperCase() || ''}`} />
                <meta property="og:image" content={img} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div className={styles.container}>
                <div className={styles.title_box}>
                    <p className={styles.description}>Выберите производителя и модель принтера</p>
                </div>
                <VendorMenuRepair />
                <Filter />
                <RepairItemsComponent 
                    data={printers} 
                    onLoadMore={handleLoadMore}
                    hasMore={hasMore}
                    isLoading={isLoading}
                />
            </div>
        </>
    );
}

export default RepairPrintersPage;

