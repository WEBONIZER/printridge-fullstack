import style from './filter.module.css'
import React from "react";
import { useDispatch } from "react-redux";
import { SEARCH_DATA_REQUEST } from '../../services/actions/filter'

const Filter = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        dispatch({
            type: SEARCH_DATA_REQUEST,
            value: value,
        })
    }, [value, dispatch])

    return (
        <>
            <label>
                <p>
                    Фильтр:&nbsp;
                </p>
                <input
                    type="text"
                    name="search"
                    placeholder='&nbsp;&nbsp;&nbsp;Введите модель картриджа'
                    className={style.input}
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
        </>
    )
}

export { Filter }