import styles from './filter.module.css'
import { useEffect, useState, FC } from "react";
import { useDispatch_ } from '../../services/reducers/root-reducer';
import { setSearchValue } from '../../services/slices/filter';
import { useLocation } from 'react-router-dom';

const Filter: FC = () => {

    const dispatch = useDispatch_();
    const location = useLocation();

    const link = location.pathname
    const service = link.includes('repair') ? 'Введите модель принтера' : link.includes('refill') ? 'Введите модель картриджа'  : link.includes('remont-noutbukov') ? 'Введите модель ноутбука' : '';    
    const [value, setValue] = useState('');

    useEffect(() => {
        dispatch(setSearchValue(value));
    }, [value, dispatch])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <input
            type="text"
            name="search"
            placeholder={service}
            className={styles.input}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
        />
    )
}

export { Filter }