import { Routes, Route} from 'react-router-dom'
import Register from '../pages/register/Register'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'



const PageRoutes = () => {


    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default PageRoutes