import { useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomePage from './pages/home/HomePage'
import ProductPage from './pages/product/ProductPage'
import { Routes , Route } from 'react-router-dom'
import CartPage from './pages/cart/CartPage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import ShippingPage from './pages/shipping/ShippingPage'
import PaymentPage from './pages/payment/PaymentPage'
import PlaceOrderPage from './pages/placeOrder/PlaceOrderPage'
import OrderPage from './pages/order/OrderPage'
import UpdateProfile from './pages/updateProfile/UpdateProfile'
import PrivateRoute from './components/private/PrivateRoute'
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
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='' element={<PrivateRoute />}>
          <Route path='/shipping' element={<ShippingPage />}/>
          <Route path='/payment' element={<PaymentPage />}/>
          <Route path='/placeorder' element={<PlaceOrderPage />}/>
          <Route path='/order/:id' element={<OrderPage />}/>
          <Route path='/updateprofile' element={<UpdateProfile />}/>
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
