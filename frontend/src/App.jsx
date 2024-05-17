import { useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomePage from './pages/home/HomePage'
import ProductPage from './pages/product/ProductPage'
import { Routes , Route } from 'react-router-dom'
import CartPage from './pages/cart/CartPage'
import LoginPage from './pages/login/LoginPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/products/:id' element={<ProductPage />}/>
        <Route path='/cart' element={<CartPage />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
