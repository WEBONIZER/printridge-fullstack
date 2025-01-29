import styles from './filter.module.css'
import { useEffect, useState, FC } from "react";
import { useDispatch } from "react-redux";
import { SEARCH_DATA_REQUEST } from '../../services/actions/filter'
import { useLocation } from 'react-router-dom';

const Filter: FC = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const link = location.pathname
    const service = link.includes('repair') ? 'Введите модель принтера' : link.includes('refill') ? 'Введите модель картриджа'  : link.includes('remont-noutbukov') ? 'Введите модель ноутбука' : '';    
    const [value, setValue] = useState('');

    useEffect(() => {
        dispatch({
            type: SEARCH_DATA_REQUEST,
            value: value,
        })
    }, [value, dispatch])

    return (
        <input
            type="text"
            name="search"
            placeholder={service}
            className={styles.input}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export { Filter }