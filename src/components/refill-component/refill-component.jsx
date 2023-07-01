import { useNavigate } from "react-router-dom";
import styles from './refill-component.module.css'
import { NavLink } from 'react-router-dom';
import FilterItemsComponent from '../filter-items-component/filter-items-component'
import {refillData} from '../../utils/refill'

function RefillComponent() {
    
    //const navigate = useNavigate();

    return (
        <div className={styles.price_container}>
            <FilterItemsComponent data={refillData}/>
        </div>
    );
}

export default RefillComponent;