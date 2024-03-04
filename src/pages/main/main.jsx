import styles from './main.module.css'
import MainPageDescriptionBox from '../../components/main-page-description-box/main-page-description-box'
import { mainDescriptionBoxes } from '../../utils/main-description-boxes'

const Main = () => {

    return (
        <div className={styles.main_box}>
            {mainDescriptionBoxes.map((i, key) => (
                <MainPageDescriptionBox title={i.title} description={i.description} name={i.name} key={key} />
            ))}
        </div>
    );
}

export default Main;