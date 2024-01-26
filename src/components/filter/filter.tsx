import styles from './filter.module.css'
import { useEffect, useState, FC } from "react";
import { useDispatch } from "react-redux";
import { SEARCH_DATA_REQUEST } from '../../services/actions/filter'

const Filter: FC = () => {

    const dispatch = useDispatch();
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
            placeholder='Введите модель картриджа'
            className={styles.input}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export { Filter }