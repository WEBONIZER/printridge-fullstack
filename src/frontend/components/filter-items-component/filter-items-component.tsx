import Item from './item/item'
import { useEffect, useRef, FC } from "react";
import styles from './filter-items-component.module.css'
import { Spinner } from '../spinner/spinner';
import { Cartridge } from '../../utils/api';

interface FilterItemsComponentProps {
    data: Cartridge[];
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
}

export const FilterItemsComponent: FC<FilterItemsComponentProps> = ({ data, onLoadMore, hasMore, isLoading }) => {

    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    onLoadMore();
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '100px'
            }
        );

        if (lastItemRef.current) {
            observerRef.current.observe(lastItemRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, isLoading, onLoadMore, data.length]);

    return (
        <div className={styles.price_container}>
            <div className={styles.price_row}>
                <p className={styles.model_cart}>{'Модель картриджа'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.vendor}>{'Модель принтера'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.chip}>{'Замена чипа'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.refill_price}>{'Заправка'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.recovery_price}>{'Восстановление'}</p>
            </div>
            {data && data
                .filter(cartridge => cartridge.public !== false)
                .map((i, key, filteredArray) => {
                    return (
                        <div key={i._id || key} style={{ display: 'contents' }}>
                            <Item
                                cartridge={i}
                            />
                        </div>
                    )
                })}
            {data && data.filter(cartridge => cartridge.public !== false).length > 0 && (
                <div ref={lastItemRef} style={{ height: '1px', width: '100%' }} />
            )}
            {isLoading && data.length > 0 && <Spinner />}
        </div>
    );
}

