import React from "react";
import "../Header/Header.css";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
export default function Header() {
  const numberCart = useSelector((state) => state.carts);

  const handleOpenCart = () => {
    console.log("ok");
  };

  const handleNumberCart = (numberCart) => {
    let total = 0;
    numberCart.forEach((item) => {
      return (total += item.quantity);
    });
    return total;
  };
  return (
    <div id="navbar">
      <Link to="/products" className="icon">
        <i className="fa-solid fa-shop"></i>
        <p>
          <span>JUNX</span>SHOP
        </p>
      </Link>
      <Link to="/cart" className="cart-wrap" onClick={handleOpenCart}>
        <i className="fa-solid fa-basket-shopping"></i>
        <span className="number-cart">{handleNumberCart(numberCart)}</span>
      </Link>
    </div>
  );
}
