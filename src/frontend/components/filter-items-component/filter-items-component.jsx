import Item from './item/item'
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import styles from './filter-items-component.module.css'
import Spinner from '../spinner/spinner';

function FilterItemsComponent({ data, onLoadMore, hasMore, isLoading }) {

    const { vendor } = useParams()
    const observerRef = useRef(null);
    const lastItemRef = useRef(null);

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
            { threshold: 0.1 }
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
                    const isLastItem = key === filteredArray.length - 1;
                    return (
                        <div key={i._id || key} ref={isLastItem ? lastItemRef : null} style={{ display: 'contents' }}>
                            <Item
                                cartridge={i}
                            />
                        </div>
                    )
                })}
            {isLoading && data.length > 0 && <Spinner />}
        </div>
    );
}

export default FilterItemsComponent;