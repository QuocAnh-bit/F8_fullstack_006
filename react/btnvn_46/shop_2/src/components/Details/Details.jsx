import React from "react";
import { setLocalStorage } from "../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading.jsx";
import { Link } from "react-router-dom";
import "../Details/Details.scss";
export default function Details() {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);
  const carts = useSelector((state) => state.carts);
  console.log(detail);
  const handleAddCart = (id, name, price, brand, remainingQuantity, img) => {
    const newCarts = [...carts];
    const cartCheck = newCarts.find((cart) => cart.id === id);
    if (cartCheck) {
      cartCheck.quantity = cartCheck.quantity + 1;
      setLocalStorage("cart", newCarts);
      dispatch({ type: "ADD_TO_CART", payload: newCarts });
    } else {
      setLocalStorage("cart", [
        ...carts,
        { id, name, price, quantity: 1, brand, remainingQuantity, img },
      ]);
      dispatch({
        type: "ADD_TO_CART",
        payload: [
          ...carts,
          { id, name, price, quantity: 1, brand, remainingQuantity, img },
        ],
      });
    }
    toast.success(`Đã thêm sản phẩm ${name}`);
  };

  console.log(loading);
  return (
    <>
      <div className="card">
        <nav>{detail.category}</nav>
        <div className="photo">
          <img src={detail.image} />
        </div>
        <div className="description">
          <h2>{detail.name}</h2>
          <h4>{detail.brand}</h4>
          <h1>${detail.price.toLocaleString()}</h1>
          <p>{detail.description}</p>
          <button
            onClick={() => {
              handleAddCart(
                detail._id,
                detail.name,
                detail.price,
                detail.brand,
                detail.quantity,
                detail.image
              );
            }}
          >
            Add to Cart
          </button>
          <Link to="/products">
            {" "}
            <button>Go Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}
