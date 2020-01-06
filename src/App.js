import React from "react";
import "./App.css";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import SingleProduct from "./pages/SingleProduct";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/products/:slug" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />

        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
