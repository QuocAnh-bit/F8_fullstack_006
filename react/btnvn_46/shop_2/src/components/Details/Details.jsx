import React, { useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading.jsx";
import { PAGE_LIMIT } from "../../config/config.json";
import { Link, NavLink, useParams } from "react-router-dom";
import "../Details/Details.scss";
import { apiGetProductDetails, apiGetProductList } from "../../Api/Api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Details() {
  const dispatch = useDispatch();
  const detail = getLocalStorage("detail");
  const loading = useSelector((state) => state.loading);
  const carts = useSelector((state) => state.carts);
  const { id } = useParams();

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
  const handleBack = () => {
    apiGetProductList({ limit: PAGE_LIMIT }, dispatch);
    dispatch({ type: "RESET_DETAIL" });
  };
  useEffect(() => {
    if (id !== undefined) {
      apiGetProductDetails(id, dispatch);
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="card">
          <nav>CATEGORY: {detail.category}</nav>
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
              <button className="btn-control" onClick={handleBack}>
                Go Home
              </button>
            </Link>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
