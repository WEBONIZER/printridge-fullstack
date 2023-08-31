import styles from './refill-item-component.module.css'
import { useParams } from "react-router-dom";
import { refillData } from '../../../utils/refill';
import Tabs from '../../tabs/tabs';
import ImageBox from '../refill-item-component/image-box/image-box'
import AboutItem from '../refill-item-component/about-item/about-item'
import DescriptionBox from './description-box/description-box'

function RefillItemComponent() {

    const { model } = useParams()
    const data = refillData.find((i) => i.modelCart === model)

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Заправка картриджа {`${data.vendor} ${data.modelCart}`}</h1>
            <div className={styles.img_desc_box}>
                <div className={styles.left_box}>
                    <ImageBox />
                    <AboutItem />
                    <DescriptionBox />
                </div>
                {
                    data.examples.length !== 0
                    &&
                    <div className={styles.tabs_box}>
                        <Tabs items={data.examples} />
                    </div>
                }
            </div>



        </div>
    );
}

export default RefillItemComponent;