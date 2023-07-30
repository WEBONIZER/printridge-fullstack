import style from './vendor-menu-repair.module.css'
import { NavLink, useLocation } from 'react-router-dom'
 
function VendorMenuRepair() {

    const location = useLocation();

    const activeLink = ({ isActive }) => ({ color: isActive ? '#e76e1a' : '#000' });

    return (
            <nav className={style.navigation}>
                  <NavLink 
                  to='/repair/hp' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  exact={true}
                  >HP
                  </NavLink>
                  <NavLink 
                  to='/repair/canon' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Canon
                  </NavLink>
                  <NavLink 
                  to='/repair/samsung' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Samsung
                  </NavLink>
                  <NavLink 
                  to='/repair/kyocera' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Kyocera
                  </NavLink>
                  <NavLink 
                  to='/repair/xerox' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Xerox
                  </NavLink>
                  <NavLink 
                  to='/repair/brother' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Brother
                  </NavLink>
                  <NavLink 
                  to='/repair/oki' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >OKI
                  </NavLink>
                  <NavLink 
                  to='/repair/pantum' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Pantum
                  </NavLink>
                  <NavLink 
                  to='/repair/minolta' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Minolta
                  </NavLink>
                  <NavLink 
                  to='/repair/epson' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Epson
                  </NavLink>
                  <NavLink 
                  to='/repair/sharp' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Sharp
                  </NavLink>
            </nav>
    )
}

export { VendorMenuRepair }