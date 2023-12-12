import { BrowserRouter } from 'react-router-dom'
import PageRoutes from './routes/PageRoutes'
import NavBar from './components/navbar/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <PageRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
