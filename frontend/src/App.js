import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import Home from './pages/Home'
import Navigation from './components/Navigation'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useSelector } from 'react-redux';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CatePage from './pages/CatePage'
import CheckOutForm from './pages/CheckOutForm';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = useSelector((state) => state.user)

  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
        <Navigation />
        <Routes>
          {/* <Route index element = {<Home />} /> */}
          {!user && <>
            <Route path="/login"  element={<Login />} />
            <Route path="/signup" element={<Signup />}/>
          </>}
          {user && (<>
            <Route path='/cart' element={<CartPage/>} />
            <Route path='/checkout' element={<CheckOutForm/>} />
          </>)}
          <Route path='/category' element={<CatePage />}/>
          <Route path='/product/:id' element={<ProductPage/>}/>    
          <Route path="/" element={ <Home />} />
        </Routes>

      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
