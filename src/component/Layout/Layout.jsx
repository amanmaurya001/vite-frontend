import React, { Fragment } from "react";
import '../Layout/Layout.css';
import LandingPage from "../../pages/LandingPage/LandingPage";
import Footer from "../Footer/footer";
import NavMain from "../Navbar/NavMain/NavMain";
import Hamburger from "../Navbar/Hamburger/Hamburger";
import  { Toaster } from 'react-hot-toast';


const Layout = (props) => {
  return (

<div className="layout-main">
    
        <NavMain />
  

    
      {props.children}
   
 

 
        <Footer />
    
         <Toaster />
  </div>
 
  );
};

export default Layout;
