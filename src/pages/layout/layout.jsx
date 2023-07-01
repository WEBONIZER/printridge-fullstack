import Header from "../header/header";
import Footer from "../footer/footer";
import NavigationMenu from '../navigate/navigate'
import styles from './layout.module.css'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className={styles.app}>
            <Header />
            <main className={styles.main}>
                <NavigationMenu />
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout