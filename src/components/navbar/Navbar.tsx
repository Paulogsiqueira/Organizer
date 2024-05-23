import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/sliceUser'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { logoutUser } from '@/redux/sliceUser'
import organizer from '/navbar/organizer.png'
import '@/style/navbar/navbar.sass'

const NavBar = () => {
    const user = useSelector(selectUser)
    const userLogged: boolean = (user.isLogged)
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to="/" className='logo-title'>
                    <img src={organizer} alt="Icone Organizer" />
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
                    {!userLogged && <li><NavLink className='navbar-link' to="/login">Entrar</NavLink></li>}
                    {!userLogged && <li><NavLink className='navbar-link' to="/register">Cadastrar</NavLink></li>}
                    {userLogged && <li><NavLink className='navbar-link' to="/dashboard">Dashboard</NavLink></li>}
                    {userLogged && <li><NavLink className='navbar-link' to="/statistics">Estatísticas</NavLink></li>}
                    {// userLogged && <li><NavLink className='navbar-link' to="/historic">Histórico</NavLink></li>}
                    {userLogged && <li><NavLink className='navbar-link' to="/perfil">Perfil</NavLink></li>}
                    {userLogged && <li onClick={handleLogout}><Link className='navbar-link' to="/">Sair</Link> </li>}
                </ul>
            </div>

        </nav >
    )
}

export default NavBar
