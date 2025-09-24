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


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/contact' component={Contact} />
        
          <Route exact path='/owner/dashboard' component={OwnerDashboard} /> {/* ✅ This line fixes it */}
          <Route exact path="/owner/login" component={OwnerLogin} />

        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
