import HeaderComponent from '../../components/header/header'
import Footer from "../footer/footer";
import NavigationMenu from '../navigate/navigate'
import styles from './layout.module.css'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className={styles.app}>
            <HeaderComponent />
            <main className={styles.main}>
                <Outlet />
            </main>
            <NavigationMenu />
            {/*<Footer />*/}
        </div>
    )
}

export default Layout