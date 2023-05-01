// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CatePage from "./pages/CatePage";
import CheckOutForm from "./pages/CheckOutForm";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOrder from "./pages/CheckOrder";
import ShopPage from "./pages/ShopPage";
import AdminHome from "./pages/admin/AdminHome";
import DashboardProduct from "./components/DashboardProduct";
import OrderAdminPage from "./components/OrderAdminPage";
import ClientAdminPage from "./components/ClientAdminPage";
import NewProduct from "./pages/admin/NewProduct";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        {/* {pathname !== "/login" ? <Navigation /> : <NavigationLogin />} */}
        {/* {window.location.pathname === "/login"} */}
        <Navigation />

        <Routes>
          {/* <Route index element = {<Home />} /> */}
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {user && (
            <>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckOutForm />} />
              <Route path="/checkorder" element={<CheckOrder />} />
            </>
          )}
          {user?.user.admin && (
            <>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/products" element={<DashboardProduct />} />
              <Route path="/admin/orders" element={<OrderAdminPage />} />
              <Route path="/admin/clients" element={<ClientAdminPage />} />
              <Route path="/admin/new-product" element={<NewProduct />} />
            </>
          )}
          <Route path="/category" element={<CatePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/products" element={<ShopPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
