import style from './vendor-menu.module.css'
import { NavLink, useLocation } from 'react-router-dom'
 
function VendorMenu() {

    const location = useLocation();

    const activeLink = ({ isActive }) => ({ color: isActive ? '#e76e1a' : '#000' });

    //const locationCategory = 

    return (
            <nav className={style.navigation}>
                  <NavLink 
                  to='/refill/hp' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  exact={true}
                  >HP
                  </NavLink>
                  <NavLink 
                  to='/refill/canon' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Canon
                  </NavLink>
                  <NavLink 
                  to='/refill/samsung' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Samsung
                  </NavLink>
                  <NavLink 
                  to='/refill/kyocera' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Kyocera
                  </NavLink>
                  <NavLink 
                  to='/refill/xerox' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Xerox
                  </NavLink>
                  <NavLink 
                  to='/refill/brother' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Brother
                  </NavLink>
                  <NavLink 
                  to='/refill/oki' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >OKI
                  </NavLink>
                  <NavLink 
                  to='/refill/pantum' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Pantum
                  </NavLink>
                  <NavLink 
                  to='/refill/minolta' 
                  className={style.item_link} 
                  style={activeLink} 
                  state={{ background: location }}
                  >Minolta
                  </NavLink>
            </nav>
    )
}

export { VendorMenu }