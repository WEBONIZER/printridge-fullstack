import style from './vendor-menu.module.css'
import { NavLink, useParams } from 'react-router-dom'

function VendorMenu() {

    const { vendor } = useParams()

    const activeLink = ({ isActive }) => ({ color: isActive ? '#001027' : '#005CE5' });

    return (
        <nav className={style.navigation}>
            <NavLink
                to='/refill/hp'
                className={vendor === 'hp' ? style.item_link_active : style.item_link}
            >HP
            </NavLink>
            <NavLink
                to='/refill/canon'
                className={style.item_link}
            >Canon
            </NavLink>
            <NavLink
                to='/refill/samsung'
                className={style.item_link}
            >Samsung
            </NavLink>
            <NavLink
                to='/refill/kyocera'
                className={style.item_link}
            >Kyocera
            </NavLink>
            <NavLink
                to='/refill/xerox'
                className={style.item_link}
            >Xerox
            </NavLink>
            <NavLink
                to='/refill/brother'
                className={style.item_link}
            >Brother
            </NavLink>
            <NavLink
                to='/refill/oki'
                className={style.item_link}
            >OKI
            </NavLink>
            <NavLink
                to='/refill/minolta'
                className={style.item_link}
            >Minolta
            </NavLink>
        </nav>
    )
}

export { VendorMenu }