import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

// Redux Slice
import { checkAuth } from "./redux/authSlice";

// Layout & Common Components
import Layout from "./component/Layout/Layout";
import ProtectedRoute from "./component/ProtectedRoutes/Protectedroutes";

// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductListingPage from "./pages/ProductListingPage/ProductListingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import WishList from "./pages/WishList/WishList";
import Cart from "./pages/Cart/Cart";
import RandomSwiper from "./component/RandomSwiper/RandomSwiper";
import AddressSelection from "./component/AddressSelection/AddressSelection";

// Profile Related
import ProfileDashboard from "./pages/ProfileDashboard/ProfileDashboard";
import Profile from "./component/ProfileElements/Profile/Profile";
import CreateAddress from "./component/ProfileElements/CreateAddress/CreateAddress";
import ShowAddress from "./component/ProfileElements/ShowAdress/ShowAdress";
import EditAddress from "./component/ProfileElements/EditAddress/EditAddress";
import OrderHistory from "./component/OrderHistory/OrderHistory";
import ChangePassword from "./component/ProfileElements/ChangePassword/ChangePassword";

// Admin Related
import DashBoard from "./component/Admin/DashBoard/DashBoard";
import Products from "./component/Admin/Products/Products";
import CreateProduct from "./component/Admin/CreateProducts/CreateProduct";
import EditProducts from "./component/Admin/EditProducts/EditProducts";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  // ✅ Page load pe user authentication check
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <Layout>
      {/* Toast Notifications */}
      <Toaster />

      <Routes>
        {/* ==============================
              Public Routes
        =============================== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<ProductListingPage />} />
        <Route path="/RandomSwiper" element={<RandomSwiper />} />
        <Route path="/adressSelection" element={<AddressSelection />} />

        {/* Product Listings */}
        <Route
          path="/productlisting/:navGender/allproducts"
          element={<ProductListingPage />}
        />
        <Route
          path="/productlisting/:navGender/:navCategory"
          element={<ProductListingPage />}
        />

        {/* Single Product Page */}
        <Route path="/products/:productId" element={<ProductPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Cart & Wishlist */}
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />

        {/* ==============================
              Profile Dashboard (Nested Routes)
        =============================== */}
        <Route path="/profiledashboard" element={  <ProtectedRoute> <ProfileDashboard /> </ProtectedRoute> }>
          <Route path="profile" element={<Profile />} />
          <Route path="ChangePassword" element={<ChangePassword />} />
          <Route path="createAdress" element={<CreateAddress />} />
          <Route path="showAdress" element={<ShowAddress />} />
          <Route path="editAddress/:addressId" element={<EditAddress />} />
          <Route path="orderhistory" element={<OrderHistory />} />
        </Route>

        {/* ==============================
              Admin Dashboard (Protected)
        =============================== */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        >
          {/* Default Welcome Page */}
          <Route index element={<h3>Welcome to Dashboard 👋</h3>} />

          {/* Admin Features */}
          <Route path="all-products" element={<Products />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path=":SingleProductId" element={<EditProducts />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
