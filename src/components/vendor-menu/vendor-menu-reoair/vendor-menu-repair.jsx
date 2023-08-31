import style from './vendor-menu-repair.module.css'
import { NavLink } from 'react-router-dom'

function VendorMenuRepair() {

    const activeLink = ({ isActive }) => ({ color: isActive ? '#e76e1a' : '#000' });

    return (
        <nav className={style.navigation}>
            <NavLink
                to='/repair/hp'
                className={style.item_link}
                style={activeLink}
                exact="true"
            >HP
            </NavLink>
            <NavLink
                to='/repair/canon'
                className={style.item_link}
                style={activeLink}
            >Canon
            </NavLink>
            <NavLink
                to='/repair/samsung'
                className={style.item_link}
                style={activeLink}
            >Samsung
            </NavLink>
            <NavLink
                to='/repair/kyocera'
                className={style.item_link}
                style={activeLink}
            >Kyocera
            </NavLink>
            <NavLink
                to='/repair/xerox'
                className={style.item_link}
                style={activeLink}
            >Xerox
            </NavLink>
            <NavLink
                to='/repair/oki'
                className={style.item_link}
                style={activeLink}
            >OKI
            </NavLink>
            <NavLink
                to='/repair/minolta'
                className={style.item_link}
                style={activeLink}
            >Minolta
            </NavLink>
            <NavLink
                to='/repair/epson'
                className={style.item_link}
                style={activeLink}
            >Epson
            </NavLink>
            <NavLink
                to='/repair/sharp'
                className={style.item_link}
                style={activeLink}
            >Sharp
            </NavLink>
        </nav>
    )
}

export { VendorMenuRepair }