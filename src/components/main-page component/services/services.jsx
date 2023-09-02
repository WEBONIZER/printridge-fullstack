import styles from './services.module.css'
import RefillItem from './refill-item/refill-item'
import RepairItem from './repair-item/repair-item'

const Services = () => {



    return (
        <div className={styles.container}>
            <RefillItem />
            <RepairItem />
        </div>
    )

}

export default Services