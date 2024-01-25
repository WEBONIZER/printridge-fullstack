import styles from './main.module.css'
import MainPageDescriptionBox from '../../components/main-page-description-box/main-page-description-box'
import imagePrinterWithPlus from '../../images/printer-with-plus.svg'

const Main = () => {

    return (
        <div className={styles.main_box}>
            <MainPageDescriptionBox
                title='Заправка картриджей'
                description='Заправка картриджей нужна для заправки картриджейЗаправка картриджей 
            нужна для заправки картриджейЗаправка картриджей нужна для заправки картриджейЗаправка картриджей нужна 
            для заправки картриджейЗаправка картриджей нужна для заправки картриджейЗаправка картриджей нужна для 
            заправки картриджейЗаправка картриджей нужна для заправки картриджей'
                image={imagePrinterWithPlus}
            />
        </div>
    );
}

export default Main;