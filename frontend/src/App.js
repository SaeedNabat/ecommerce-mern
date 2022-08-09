import './App.css';
import { 
  BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
function App() {
  return (
      <div className="App">
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>} />
     </Routes>
    <Footer/>
    </div>
   
  );
}

export default App;
