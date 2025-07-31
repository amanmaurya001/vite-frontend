import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductListingPage from "./pages/ProductListingPage/ProductListingPage";
import Layout from "./component/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import WishList from "./pages/WishList/WishList";
import Cart from "./pages/Cart/Cart";
import ProductPage from "./pages/ProductPage/ProductPage";
import AllProductPage from "./pages/AllProductPage/AllProductPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Signup from "./pages/Signup/Signup";
import Profile from "./component/ProfileElements/Profile/Profile";
import CreateProduct from "./component/Admin/CreateProducts/CreateProduct";
import Products from "./component/Admin/Products/Products";
import DashBoard from "./component/Admin/DashBoard/DashBoard";
import EditProducts from "./component/Admin/EditProducts/EditProducts";
import ProtectedRoute from "./component/ProtectedRoutes/Protectedroutes";
import ProfileDashboard from "./pages/ProfileDashboard/ProfileDashboard";
import CreateAddress from "./component/ProfileElements/CreateAddress/CreateAddress";
import ShowAddress from "./component/ProfileElements/ShowAdress/ShowAdress";
import EditAddress from "./component/ProfileElements/EditAddress/EditAddress";
import RandomSwiper from "./component/RandomSwiper/RandomSwiper";
import AddressSelection from "./component/AddressSelection/AddressSelection";
import OrderHistory from "./component/OrderHistory/OrderHistory";

import { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
           <Route path="/adressSelection" element={<AddressSelection/>} />
        <Route path="/" element={<LandingPage />} />
              
         <Route path="/search" element={<SearchPage />} />
        <Route path="/RandomSwiper" element={<RandomSwiper />} />

        <Route
          path="/productlisting/:navGender/allproducts"
          element={<AllProductPage />}
        />
          

        <Route
          path="/productlisting/:navGender/:navCategory"
          element={<ProductListingPage />}
        />

        
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />


               {/* internal routes of profile dash baord */}
          <Route path="/profiledashboard" element={<ProfileDashboard />} >
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="createAdress" element={<CreateAddress />} />
              <Route path="showAdress" element={<ShowAddress />} />
              <Route path="editAddress/:addressId" element={<EditAddress />} />
                <Route path="orderhistory" element={<OrderHistory />} />

         </Route>

     {/* internal routes of admin dash board dash baord */}
        <Route path="/admin/dashboard" element={<ProtectedRoute> <DashBoard /></ProtectedRoute>}>
          <Route index element={<h3>Welcome to Dashboard 👋</h3>} />
          <Route path="all-products" element={<Products />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path=":SingleProductId" element={<EditProducts />} />
        </Route>


      </Routes>
    </Layout>
  );
}

export default App;
