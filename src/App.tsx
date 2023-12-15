import { BrowserRouter } from 'react-router-dom'
import PageRoutes from './routes/PageRoutes'
import NavBar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'


function App() {
 

  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <PageRoutes />
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
