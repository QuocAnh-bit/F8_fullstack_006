import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGetProductList } from "../../Api/Api";
import { PAGE_LIMIT } from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Products/Products.css";

export default function Products() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productList);
  const loading = useSelector((state) => state.loading);
  const carts = useSelector((state) => state.carts);

  const handleAddCart = (id, name, price, brand, remainingQuantity, img) => {
    const newCarts = [...carts];
    const cartCheck = newCarts.find((cart) => cart.id === id);
    if (cartCheck) {
      cartCheck.quantity = cartCheck.quantity + 1;
      dispatch({ type: "ADD_TO_CART", payload: newCarts });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: [
          ...carts,
          { id, name, price, quantity: 1, brand, remainingQuantity, img },
        ],
      });
    }
  };

  useEffect(() => {
    apiGetProductList({ limit: PAGE_LIMIT }, dispatch);
  }, []);
  return (
    <>
      <h1 className="title-products">PRODUCT</h1>
      {console.log(carts)}
      {loading ? (
        "Loading..."
      ) : (
        <div className="products">
          {data.listProduct.map((item, index) => (
            <div className="item-product" key={index}>
              <div className="img-product">
                <img src={item.image} />
              </div>
              <div className="detail-product">
                <h3>{item.name}</h3>
                <div className="detail-control">
                  <div className="quality-price">
                    <h4 className="price">
                      {`$` + item.price.toLocaleString()}{" "}
                    </h4>
                  </div>
                  <div className="btn-control">
                    <button
                      className="btn-add"
                      onClick={() => {
                        handleAddCart(
                          item._id,
                          item.name,
                          item.price,
                          item.brand,
                          item.quantity,
                          item.image
                        );
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </>
  );
}
