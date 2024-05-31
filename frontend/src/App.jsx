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
import AdminRoute from './components/private/AdminRoute'
import OrderList from './pages/orderListForAdmin/OrderList'
import ProductForAdmin from './pages/productListForAdmin/ProductForAdmin'
import ProductEditForAdmin from './pages/productEditForAdmin/ProductEditForAdmin'
import UsersPage from './pages/usersListForAdmin/UsersPage'
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

        {/* here goes the private routes only the registered ones have access */}
        <Route path='' element={<PrivateRoute />}>
          <Route path='/shipping' element={<ShippingPage />}/>
          <Route path='/payment' element={<PaymentPage />}/>
          <Route path='/placeorder' element={<PlaceOrderPage />}/>
          <Route path='/order/:id' element={<OrderPage />}/>
          <Route path='/updateprofile' element={<UpdateProfile />}/>
        </Route>

        {/* here goes the admin routes which the admin can only access  */}
        <Route path='' element={<AdminRoute />}>
          <Route path='/admin/orderlist' element={<OrderList />}/>
          <Route path='/admin/productlist' element={<ProductForAdmin />}/>
          <Route path='/admin/product/:id/edit' element={<ProductEditForAdmin />}/>
          <Route path='/admin/userlist' element={<UsersPage />}/>
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
