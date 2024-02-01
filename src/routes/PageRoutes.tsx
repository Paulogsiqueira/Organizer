import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/sliceUser';
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Perfil from '@/pages/perfil/Perfil';
import Dashboard from '@/pages/dashboard/Dashboard';
import Statistics from '@/pages/statistics/Statistics';

const PageRoutes = () => {
    const user = useSelector(selectUser);
    const userLogged = user.isLogged;

    if (!userLogged) {
        return (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Navigate to="/" />} />
                <Route path='/statistics' element={<Navigate to="/" />} />
                <Route path='/perfil' element={<Navigate to="/" />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Navigate to="/" />} />
            <Route path='/login' element={<Navigate to="/" />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/statistics' element={<Statistics />} />
            <Route path='/perfil' element={<Perfil />} />
        </Routes>
    );
};

export default PageRoutes;
