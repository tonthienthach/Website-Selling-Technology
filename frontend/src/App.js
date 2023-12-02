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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CheckOrder from "./pages/CheckOrder";
import ShopPage from "./pages/ShopPage";
import AdminHome from "./pages/admin/AdminHome";
import DashboardProduct from "./pages/admin/DashboardProduct";
import OrderAdminPage from "./pages/admin/OrderAdminPage";
import ClientAdminPage from "./pages/admin/ClientAdminPage";
import NewProduct from "./pages/admin/NewProduct";
import EditProductPage from "./pages/admin/EditProductPage";
import SearchPage from "./pages/SearchPage";
import Footer from "./components/Footer";
import NoticePage from "./pages/NoticePage";
import UserInfo from "./pages/UserInfo";
import MessageBox from "./components/MessageBox";
import MessageAdminPage from "./pages/admin/MessageAdminPage";
import IntroPage from "./pages/IntroPage";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const user = useSelector((state) => state.user);
  // const location = useLocation();

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        {/* {(location.pathname !== "/login" && location.pathname !== "/signup") ? <NavigationLogin /> : <NavigationLogin />} */}
        {/* {window.location.pathname === "/login"} */}
        <Navigation />
        {user && !user?.user?.admin && <MessageBox user={user} />}

        <Routes>
          {/* <Route index element = {<Home />} /> */}
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </>
          )}
          {user && (
            <>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckOutForm />} />
              <Route path="/payment/result" element={<NoticePage />} />
              <Route path="/checkorder" element={<CheckOrder />} />
              <Route path="/userinfo" element={<UserInfo />} />
            </>
          )}
          {user?.user?.admin && (
            <>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/products" element={<DashboardProduct />} />
              <Route path="/admin/orders" element={<OrderAdminPage />} />
              <Route path="/admin/messages" element={<MessageAdminPage />} />
              <Route path="/admin/clients" element={<ClientAdminPage />} />
              <Route path="/admin/new-product" element={<NewProduct />} />
              <Route
                path="/admin/edit-product/:id"
                element={<EditProductPage />}
              />
            </>
          )}
          <Route path="/category" element={<CatePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/intro/:id" element={<IntroPage />} />
          <Route path="/products/search" element={<SearchPage />} />
          <Route path="/products" element={<ShopPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
