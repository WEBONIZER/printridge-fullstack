import style from './vendor-menu.module.css'
import { NavLink, useParams } from 'react-router-dom'

function VendorMenu() {

    const { vendor } = useParams()

    return (
        <nav className={style.navigation}> 
            <NavLink
                to='/refill/hp'
                className={vendor === 'hp' ? style.item_link_active : style.item_link}
            >HP
            </NavLink>
            <NavLink
                to='/refill/canon'
                className={vendor === 'canon' ? style.item_link_active : style.item_link}
            >Canon
            </NavLink>
            <NavLink
                to='/refill/samsung'
                className={vendor === 'samsung' ? style.item_link_active : style.item_link}
            >Samsung
            </NavLink>
            <NavLink
                to='/refill/kyocera'
                className={vendor === 'kyocera' ? style.item_link_active : style.item_link}
            >Kyocera
            </NavLink>
            <NavLink
                to='/refill/xerox'
                className={vendor === 'xerox' ? style.item_link_active : style.item_link}
            >Xerox
            </NavLink>
            <NavLink
                to='/refill/brother'
                className={vendor === 'brother' ? style.item_link_active : style.item_link}
            >Brother
            </NavLink>
            <NavLink
                to='/refill/oki'
                className={vendor === 'oki' ? style.item_link_active : style.item_link}
            >OKI
            </NavLink>
            <NavLink
                to='/refill/minolta'
                className={vendor === 'minolta' ? style.item_link_active : style.item_link}
            >Minolta
            </NavLink>
            <NavLink
                to='/refill/pantum'
                className={vendor === 'pantum' ? style.item_link_active : style.item_link}
            >Pantum
            </NavLink>
        </nav>
    )
}

export { VendorMenu }