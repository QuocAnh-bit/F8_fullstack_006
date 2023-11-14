import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Products from "./components/Products/Products.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Details from "./components/Details/Details.jsx";
export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/products/details/:id" element={<Details />}></Route>
      </Routes>
    </div>
  );
}
