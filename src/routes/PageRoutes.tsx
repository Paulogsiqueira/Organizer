import { Routes, Route} from 'react-router-dom'
import Register from '../pages/register/Register'
import Home from '../pages/home/Home'



const PageRoutes = () => {


    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    )
}

export default PageRoutes