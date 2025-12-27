import RepairItem from '../item/repair-item/repair-item'
import { useEffect, useRef, FC } from "react";
import styles from './repair-items-component.module.css'
import { Spinner } from '../../spinner/spinner';
import { Printer } from '../../../utils/api';

interface RepairItemsComponentProps {
    data: Printer[];
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
}

export const RepairItemsComponent: FC<RepairItemsComponentProps> = ({ data, onLoadMore, hasMore, isLoading }) => {

    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastItemRef = useRef<HTMLAnchorElement | null>(null);

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
                <p className={styles.model}>{'Устройство'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.type}>{'Способ печати'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.device}>{'Тип устройства'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.format}>{'Формат'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.speed}>{'Скорость'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.capacity}>{'Нагрузка'}</p>
            </div>
            {data && data
                .filter(printer => printer.public !== false)
                .map((printer, key, filteredArray) => {
                    const isLastItem = key === filteredArray.length - 1;
                    return (
                        <RepairItem
                            key={printer._id || key}
                            ref={isLastItem ? lastItemRef : undefined}
                            printer={printer}
                        />
                    )
                })}
            {isLoading && data.length > 0 && <Spinner />}
        </div>
    )
}

