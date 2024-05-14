import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/sliceUser'
import Register from '../pages/register/Register'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Perfil from '@/pages/perfil/Perfil'
import Dashboard from '@/pages/dashboard/Dashboard'
import Statistics from '@/pages/statistics/Statistics'
import Historic from '@/pages/historic/Historic'

const PageRoutes = () => {
    const user = useSelector(selectUser)
    const userLogged: boolean = (user.isLogged)

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={ !userLogged ? <Register /> : <Home/>} />
            <Route path='/login' element={ !userLogged ? <Login /> : <Home/>} />
            <Route path='/dashboard' element={ userLogged ? <Dashboard /> : <Home/>} />
            <Route path='/historic' element={ userLogged ? <Historic /> : <Home/>} />
            <Route path='/statistics' element={ userLogged ? <Statistics /> : <Home/>} />
            <Route path='/perfil' element={ userLogged ? <Perfil /> : <Home/>} />
        </Routes>
    )
}

export default PageRoutes