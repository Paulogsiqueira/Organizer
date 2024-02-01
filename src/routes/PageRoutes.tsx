import { Routes, Route } from 'react-router-dom'

import Register from '../pages/register/Register'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Perfil from '@/pages/perfil/Perfil'
import Dashboard from '@/pages/dashboard/Dashboard'
import Statistics from '@/pages/statistics/Statistics'

const PageRoutes = () => {


    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={ <Register/>} />
            <Route path='/login' element={ <Login/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/statistics' element={<Statistics/>} />
            <Route path='/perfil' element={<Perfil/>} />
        </Routes>
    )
}

export default PageRoutes