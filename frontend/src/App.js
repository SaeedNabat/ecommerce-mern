import './App.css';
import {useEffect,useState} from 'react';
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
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'
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
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
function App() {
  const [stripeApiKey,setStripeApiKey] = useState('');

  
  useEffect(()=>{
    async function getStripeApiKey (){
      const {data} = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }
    store.dispatch(loadUser());
    getStripeApiKey();
  })
  return (
      <div className="App">
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>} exact />
      <Route path='/search/:keyword' element={<Home/>}  /> 
      <Route path="/product/:id" element={<ProductDetails/>} exact />
      <Route path="/cart" element={<Cart/>} exact />
      <Route path="/shipping" element={<Shipping/>} />
      <Route path="/order/confirm" element={<ConfirmOrder/>}  />
      <Route path="/success" element={<OrderSuccess/>}  />
      <Route path='/login' element={<Login/>}  />
      <Route path='/register' element={<Register/>}  />
      <Route path='/password/forgot' element={<ForgotPassword/>} exact />
      <Route path='/password/reset/:token' element={<NewPassword/>} exact />
      {stripeApiKey && 
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute path="/payment"  element={<Payment/>} />
        </Elements>
      }
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
