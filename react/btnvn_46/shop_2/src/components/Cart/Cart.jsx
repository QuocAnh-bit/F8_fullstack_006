import React from "react";
import "../Cart/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Cart() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts);
  const handleIncrement = (cartsId) => {
    const cartCheck = carts.find((cart) => cart.id === cartsId);
    if (cartCheck) {
      cartCheck.quantity = cartCheck.quantity + 1;
      dispatch({ type: "ADD_TO_CART", payload: [...carts] });
    }
  };
  const handleDecrement = (cartsId) => {
    const cartCheck = carts.find((cart) => cart.id === cartsId);
    if (cartCheck) {
      if (cartCheck.quantity > 1) {
        cartCheck.quantity = cartCheck.quantity - 1;
      } else {
        toast.warning("Số lượng có ít nhất là 1");
      }
      dispatch({ type: "ADD_TO_CART", payload: [...carts] });
    }
  };
  let totalProduct = 0;
  let totalPrice = 0;
  return (
    <>
      {console.log(carts)}
      <h1 className="title-cart">SHOPPING CART</h1>
      <div className="wrap-cart">
        <div className="box-cart">
          <div className="cart-left">
            <table className="table-cart">
              <thead>
                <tr>
                  <th>Tên Sản Phẩm/ Nhãn hàng</th>
                  <th>Số Lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {carts.length
                  ? carts.map((cart, index) => {
                      totalProduct += cart.quantity;
                      totalPrice += cart.price * cart.quantity;
                      return (
                        <tr key={index}>
                          <td className="details">
                            <img src={cart.img} alt="" />
                            <div className="content-details">
                              <p className="name-brand">{cart.brand}</p>
                              <p className="name-product">{cart.name}</p>
                              <p className="remaining-quantity">
                                Số Lượng:{" "}
                                {(
                                  cart.remainingQuantity - cart.quantity
                                ).toLocaleString()}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="quantity-control">
                              <span
                                onClick={() => {
                                  handleDecrement(cart.id);
                                }}
                              >
                                -
                              </span>
                              <div>{cart.quantity}</div>
                              <span onClick={() => handleIncrement(cart.id)}>
                                +
                              </span>
                            </div>
                          </td>
                          <td>${cart.price.toLocaleString()}</td>
                          <td className="total-price-item">
                            <div>
                              ${(cart.price * cart.quantity).toLocaleString()}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
          <div className="cart-right">
            <div className="title-cart-right">
              <h2>TOTAL PAY</h2>
            </div>
            <div className="total-product">
              <p>Tổng số sản phẩm</p>
              <h4>{totalProduct}</h4>
            </div>
            <div className="total-price">
              <p className="title-pay">Tổng Thanh toán</p>
              <h4>${totalPrice.toLocaleString()}</h4>
            </div>
            <button>Check Out</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
