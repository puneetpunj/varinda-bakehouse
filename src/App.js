import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import SingleProduct from "./pages/SingleProduct";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import CartPage from "./pages/Cart";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/products/:slug" component={SingleProduct} />
        <Route exact path="/cart" component={CartPage} />
        <Route component={Error} />
      </Switch>
      <Modal />
    </>
  );
}

export default App;
