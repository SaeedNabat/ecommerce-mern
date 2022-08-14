import './App.css';
import {useEffect} from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from './components/user/Login';
import ProductDetails from './components/product/ProductDetails';
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/user/Register'
import UpdateProfile from './components/user/UpdateProfile'
import {loadUser} from './redux/userActions';
import store from './redux/store';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/UpdatePassword';
import NewPassword from './components/user/NewPassword';
function App() {
  useEffect(()=>{
    store.dispatch(loadUser());
  })
  return (
      <div className="App">
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>} exact />
      <Route path='/search/:keyword' element={<Home/>} exact /> 
      <Route path="/product/:id" element={<ProductDetails/>} exact />
      <Route path="/cart" element={<Cart/>} exact />
      <Route path="/shipping" element={<Shipping/>} exact />
      <Route path="/order/confirm" element={<ConfirmOrder/>} exact />
      <Route path='/login' element={<Login/>} exact />
      <Route path='/register' element={<Register/>} exact />
      <Route path='/password/forgot' element={<ForgotPassword/>} exact />
      <Route path='/password/reset/:token' element={<NewPassword/>} exact />
      <ProtectedRoute path='/me' element={<Profile/>} exact />
      <ProtectedRoute path='/me/update' element={<UpdateProfile/>} exact />
      <ProtectedRoute path='/password/update' element={<UpdatePassword/>} exact />
     </Routes>
    <Footer/>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    </div>
   
  );
}

export default App;
