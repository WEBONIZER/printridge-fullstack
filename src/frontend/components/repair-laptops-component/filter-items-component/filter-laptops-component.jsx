import LaptopItem from './laptop-item/laptop-item'
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import styles from './filter-laptops-component.module.css'
import Spinner from '../../spinner/spinner';

function FilterLaptopsComponent({ data, onLoadMore, hasMore, isLoading }) {

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
                <p className={styles.vendor}>{'Производитель'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.model}>{'Модель'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.processorVendor}>{'Процессор'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.display}>{'Диагональ'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.ram}>{'Память'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.ramType}>{'Тип памяти'}</p>
            </div>
            {data && data
                .filter(laptop => laptop.public !== false)
                .map((laptop, key, filteredArray) => {
                    const isLastItem = key === filteredArray.length - 1;
                    return (
                        <LaptopItem
                            key={laptop._id || key}
                            ref={isLastItem ? lastItemRef : null}
                            laptop={laptop}
                        />
                    )
                })}
            {isLoading && data.length > 0 && <Spinner />}
        </div>
    )
}

export default FilterLaptopsComponent;