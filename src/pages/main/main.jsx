import styles from './main.module.css'
import MainPageComponent from '../../components/main-page component/main-page component'

function Main() {

    return (
        <div className={styles.main_box}>
            <MainPageComponent />
        </div>
    );
}

export default Main;