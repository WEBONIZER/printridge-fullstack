import style from './vendor-menu-laptops.module.css'
import { NavLink, useParams } from 'react-router-dom'
import { FC } from 'react'

export const VendorMenuLaptops: FC = () => {

    const { vendor } = useParams()

    return (
        <nav className={style.navigation}>
            <NavLink
                to='/remont-noutbukov/hp'
                className={vendor === 'hp' ? style.item_link_active : style.item_link}
            >HP
            </NavLink>
            <NavLink
                to='/remont-noutbukov/acer'
                className={vendor === 'acer' ? style.item_link_active : style.item_link}
            >Acer
            </NavLink>
            <NavLink
                to='/remont-noutbukov/samsung'
                className={vendor === 'samsung' ? style.item_link_active : style.item_link}
            >Samsung
            </NavLink>
            <NavLink
                to='/remont-noutbukov/lenovo'
                className={vendor === 'lenovo' ? style.item_link_active : style.item_link}
            >Lenovo
            </NavLink>
            <NavLink
                to='/remont-noutbukov/honor'
                className={vendor === 'honor' ? style.item_link_active : style.item_link}
            >Honor
            </NavLink>
            <NavLink
                to='/remont-noutbukov/asus'
                className={vendor === 'asus' ? style.item_link_active : style.item_link}
            >Asus
            </NavLink>
            <NavLink
                to='/remont-noutbukov/huawei'
                className={vendor === 'huawei' ? style.item_link_active : style.item_link}
            >Huawei
            </NavLink>
            <NavLink
                to='/remont-noutbukov/sony'
                className={vendor === 'sony' ? style.item_link_active : style.item_link}
            >Sony
            </NavLink>
            <NavLink
                to='/remont-noutbukov/dell'
                className={vendor === 'dell' ? style.item_link_active : style.item_link}
            >Dell
            </NavLink>
        </nav>
    )
}

