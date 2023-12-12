import { NavLink, Link } from 'react-router-dom'
import '@/style/navbar/Navbar.sass'

const NavBar = () => {

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to="/" className='logo-title'>
                    <h2>Organizer</h2>
                </Link>
            </div>
            <div className='navbar-links'>
                <ul className='navbar-list'>
                    <li>
                        <NavLink to="/" className='navbar-link home-btn'>
                            Home
                        </NavLink>
                    </li>
                    <li><NavLink className='navbar-link' to="/login">Entrar</NavLink></li>
                    <li><NavLink className='navbar-link' to="/register">Cadastrar</NavLink></li>
                    <li><Link className='navbar-link' to="/">Sair</Link> </li>
                </ul>
            </div>

        </nav >
    )
}

export default NavBar