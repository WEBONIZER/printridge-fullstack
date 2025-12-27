import style from './vendor-menu-repair.module.css'
import { NavLink, useParams } from 'react-router-dom'
import { FC } from 'react'

export const VendorMenuRepair: FC = () => {

    const { vendor } = useParams()

    return (
        <nav className={style.navigation}>
            <NavLink
                to='/repair/hp'
                className={vendor === 'hp' ? style.item_link_active : style.item_link}
            >HP
            </NavLink>
            <NavLink
                to='/repair/canon'
                className={vendor === 'canon' ? style.item_link_active : style.item_link}
            >Canon
            </NavLink>
            <NavLink
                to='/repair/samsung'
                className={vendor === 'samsung' ? style.item_link_active : style.item_link}
            >Samsung
            </NavLink>
            <NavLink
                to='/repair/kyocera'
                className={vendor === 'kyocera' ? style.item_link_active : style.item_link}
            >Kyocera
            </NavLink>
            <NavLink
                to='/repair/xerox'
                className={vendor === 'xerox' ? style.item_link_active : style.item_link}
            >Xerox
            </NavLink>
            <NavLink
                to='/repair/oki'
                className={vendor === 'oki' ? style.item_link_active : style.item_link}
            >OKI
            </NavLink>
            <NavLink
                to='/repair/minolta'
                className={vendor === 'minolta' ? style.item_link_active : style.item_link}
            >Minolta
            </NavLink>
            <NavLink
                to='/repair/epson'
                className={vendor === 'epson' ? style.item_link_active : style.item_link}
            >Epson
            </NavLink>
            <NavLink
                to='/repair/sharp'
                className={vendor === 'sharp' ? style.item_link_active : style.item_link}
            >Sharp
            </NavLink>
        </nav>
    )
}

