import styles from './refill-item-page.module.css'
import RefillItemComponent from '../../components/refill-component/refill-item-component/refill-item-component'

function RefillItemPage() {

    return (
        <div className={styles.box}>
            <RefillItemComponent />
        </div>
    );
}

export default RefillItemPage;