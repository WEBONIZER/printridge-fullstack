import { HeaderComponent } from '../../components/header/header'
import { FooterComponent } from "../../components/footer/footer";
import { FeedbackButtonComponent } from '../../components/feedback-button-component/feedback-button-component'
import styles from './layout.module.css'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <div className={styles.app}>
            <HeaderComponent />
            <main className={styles.main}>
                <Outlet />
            </main>
            <FeedbackButtonComponent />
            <FooterComponent />
        </div>
    )
}