import styles from './services.module.css'
import React from 'react';
import RefillItem from './refill-item/refill-item'
import { mainServicesItems } from '../../../utils/main-services-items'

const Services = () => {

    return (
        <div className={styles.container}>
            <h2>Наши услуги</h2>
            <div className={styles.box}>
                <RefillItem 
                title={mainServicesItems.refill.title} 
                description={mainServicesItems.refill.description} 
                style={styles.box0} 
                image={mainServicesItems.refill.image}
                text={mainServicesItems.refill.text} />
                <RefillItem 
                title={mainServicesItems.repair.title} 
                description={mainServicesItems.repair.description} 
                style={styles.box1} 
                image={mainServicesItems.repair.image}
                text={mainServicesItems.repair.text} />
                <RefillItem 
                title={mainServicesItems.flashing.title} 
                description={mainServicesItems.flashing.description} 
                style={styles.box0} 
                image={mainServicesItems.flashing.image}
                text={mainServicesItems.flashing.text} />
            </div>
        </div>
    )

}

export default Services