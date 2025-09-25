import React from "react";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Home from "../home/Home";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import OwnerDashboard from '../owner/OwnerDashboard';
import OwnerLogin from "../owner/OwnerLogin";
import OwnerProfileForm from '../owner/OwnerProfileForm';



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/about' element={<About />} />
  <Route path='/services' element={<Services />} />
  <Route path='/blog' element={<Blog />} />
  <Route path='/pricing' element={<Pricing />} />
  <Route path='/contact' element={<Contact />} />
  <Route path='/dashboard' element={<OwnerDashboard />} />
  <Route path="/owner/login" element={<OwnerLogin />} />
  <Route path="/owner/profile" element={<OwnerProfileForm />} />


</Routes>

        <Footer />
      </Router>
    </>
  );
};

export default Pages;
