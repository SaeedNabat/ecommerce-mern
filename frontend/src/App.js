import './App.css';
import { 
  BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <div className="App">
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/product/:id" element={<ProductDetails/>} />
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
