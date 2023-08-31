import style from './vendor-menu.module.css'
import { NavLink } from 'react-router-dom'

function VendorMenu() {

    const activeLink = ({ isActive }) => ({ color: isActive ? '#e76e1a' : '#000' });

    return (
        <nav className={style.navigation}>
            <NavLink
                to='/refill/hp'
                className={style.item_link}
                style={activeLink}
                exact="true"
            >HP
            </NavLink>
            <NavLink
                to='/refill/canon'
                className={style.item_link}
                style={activeLink}
            >Canon
            </NavLink>
            <NavLink
                to='/refill/samsung'
                className={style.item_link}
                style={activeLink}
            >Samsung
            </NavLink>
            <NavLink
                to='/refill/kyocera'
                className={style.item_link}
                style={activeLink}
            >Kyocera
            </NavLink>
            <NavLink
                to='/refill/xerox'
                className={style.item_link}
                style={activeLink}
            >Xerox
            </NavLink>
            <NavLink
                to='/refill/brother'
                className={style.item_link}
                style={activeLink}
            >Brother
            </NavLink>
            <NavLink
                to='/refill/oki'
                className={style.item_link}
                style={activeLink}
            >OKI
            </NavLink>
            <NavLink
                to='/refill/minolta'
                className={style.item_link}
                style={activeLink}
            >Minolta
            </NavLink>
        </nav>
    )
}

export { VendorMenu }