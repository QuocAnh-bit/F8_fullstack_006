import React, { useContext, useState } from "react";
import Loading from "./Loading";
import "../assets/PaymentFrom.css";
import { ProductsContext } from "./Products";
import { client } from "../client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const { cart, setCart, handlePrice, apiKey } = useContext(ProductsContext);
  console.log(loading);
  const handlePayment = async () => {
    setLoading(true);

    const body = cart.map((item) => ({
      productId: item.id,
      quantity: item.cartQuantity,
    }));

    const { data } = await client.post(`/orders`, body, apiKey);
    if (data.status_code !== "FAILED") {
      setLoading(false);
      toast.success("Thanh toán thành công");
      setCart([]);
    }
  };

  let totalQuantityCart = 0;
  let totalPayment = null;
  return (
    <>
      {loading ? (
        <Loading />
      ) : cart.length ? (
        <>
          <section>
            <h2>Giỏ hàng</h2>
            <div className="tbl-header">
              <table cellPadding={0} cellSpacing={0} border={0}>
                <thead>
                  <tr className="title-table">
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Còn lại</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding={0} cellSpacing={0} border={0}>
                <tbody>
                  {cart.map(
                    (
                      { id, name, cartQuantity, price, totalQuantity },
                      index
                    ) => {
                      totalQuantityCart += cartQuantity;
                      totalPayment += price * cartQuantity;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{name} </td>
                          <td>{cartQuantity}</td>
                          <td>{totalQuantity - cartQuantity}</td>
                          <td>{handlePrice(price * cartQuantity)}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
            <div className="tbl-tfoot">
              <table cellPadding={0} cellSpacing={0} border={0}>
                <tfoot>
                  <tr>
                    <th className="btn-wrap">
                      <button onClick={handlePayment}>Thanh toán</button>
                    </th>
                    <th>TSL: </th>
                    <th>{totalQuantityCart}</th>
                    <th>Tổng tiền: </th>
                    <th>{handlePrice(totalPayment)}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
          <ToastContainer />
        </>
      ) : (
        <div className="empty-cart">
          <h2>Giỏ hàng trống xin vui lòng chọn sản phẩm</h2>
        </div>
      )}
    </>
  );
}
