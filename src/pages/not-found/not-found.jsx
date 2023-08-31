import { NavLink } from 'react-router-dom'

function NotFound404() {

    return (
        <>
            <p>
                NotFound404
                <NavLink to='/' >Перейти на главную страницу</NavLink>
            </p>
        </>
    );
}

export default NotFound404;