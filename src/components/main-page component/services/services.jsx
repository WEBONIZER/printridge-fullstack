import styles from './services.module.css'
import RefillItem from './refill-item/refill-item'
import { mainServicesItems } from '../../../utils/main-services-items'

const Services = () => {



    return (
        <div className={styles.box}>

            <RefillItem title={mainServicesItems.refill.title} description={mainServicesItems.refill.description} style={styles.box0} />
            <RefillItem title={mainServicesItems.repair.title} description={mainServicesItems.repair.description} style={styles.box1} />

        </div>
    )

}

export default Services