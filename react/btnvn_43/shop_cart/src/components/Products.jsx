import React, { useEffect, useState } from "react";
import "../assets/Confirm.css";

import Loading from "./Loading";
import "../assets/Products.css";
import { PAGE_LIMIT } from "../config.json";
import { client } from "../client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentForm from "./PaymentForm";

export const ProductsContext = React.createContext();
export default function Products() {
  const [loading, setLoading] = useState(true);
  const [confirm, setConFirm] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [itemProduct, setItemProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({});

  const getItemProduct = async (query = {}) => {
    const queryString = new URLSearchParams(query).toString();
    console.log(queryString);
    const { data } = await client.get(`/products?${queryString}`);
    setLoading(false);
    if (data.status_code !== "FAILED") {
      setItemProduct(data.data);
    }
  };
  const confirmEmail = async (email) => {
    const emailReplace = email.replace("@", "%40");
    const { data } = await client.get(`/api-key?email=${emailReplace}`);
    if (data.status_code !== "FAILED") {
      setLoading(false);
      setConFirm(true);
      const apiKey = data.data.apiKey;
      getProfile(apiKey);

      localStorage.setItem("apiKey", apiKey);
      setApiKey(apiKey);
      toast.success("ok");
    } else {
      toast.error(data.message);
    }
  };

  const getProfile = async (apiKey) => {
    try {
      const { data } = await client.get(`/users/profile`, null, apiKey);
      const nameUser = data.data.emailId.name;
      setLoading(false);
      getItemProduct({ limit: PAGE_LIMIT });

      localStorage.setItem("nameUser", nameUser);
      toast.success(`Chào mừng ${nameUser}`);
    } catch (e) {
      handleUnauthorize();
    }
  };
  const handleUnauthorize = () => {
    toast.error("Hết hạn đăng nhập xin vui lòng đăng nhập lại ");
    localStorage.removeItem("apiKey");
    localStorage.removeItem("nameUser");
  };

  const handlePrice = (price) =>
    (price = price.toLocaleString("en-US", {
      style: "currency",
      currency: "VND",
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmEmail(form.email);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (apiKey !== null) {
      setLoading(false);
      getProfile(apiKey);
      setConFirm(true);
    } else {
      setConFirm(false);
    }
  }, []);

  const handleAddCart = (name, price, id, totalQuantity) => {
    var newCarts = [...cart];
    const cartFind = newCarts.find((cart) => cart.id === id);
    if (cartFind) {
      cartFind.cartQuantity = cartFind.cartQuantity + 1;
      setCart(newCarts);
    } else {
      setCart([...cart, { id, name, cartQuantity: 1, price, totalQuantity }]);
    }
    toast.success("Đã thêm sản phẩm thành công");
  };

  return (
    <ProductsContext.Provider
      value={{
        itemProduct,
        setItemProduct,
        cart,
        setCart,
        handlePrice,
        apiKey,
        setLoading,
        loading,
      }}
    >
      {confirm ? (
        <div className="container">
          <h2>Welcome to shop</h2>
          <div className="item-product">
            {loading ? (
              <Loading />
            ) : (
              itemProduct.map(
                ({ image, name, price, quantity: totalQuantity, _id: id }) => (
                  <div className="item-cart" key={id}>
                    <div className="img-product">
                      <img src={image} />
                    </div>
                    <div className="detail-product">
                      <h3>{name}</h3>
                      <div className="detail-control">
                        <div className="quality-price">
                          <h4 className="price">{handlePrice(price)} </h4>
                          <p className="quantity">SL: {totalQuantity}</p>
                        </div>
                        <div className="btn-control">
                          <button
                            className="btn-add"
                            onClick={() => {
                              handleAddCart(name, price, id, totalQuantity);
                            }}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
          <PaymentForm />
        </div>
      ) : (
        <div className="wrapper-confirm">
          <form action="" className="confirm" onSubmit={handleSubmit}>
            <h1 className="title-form">Vui lòng nhập email để xác nhận</h1>
            <input
              type="email"
              className="email"
              name="email"
              placeholder="Email..."
              required
              onChange={handleChange}
            />
            <button className="btn_submit">Gửi</button>
          </form>
        </div>
      )}

      <ToastContainer />
    </ProductsContext.Provider>
  );
}
