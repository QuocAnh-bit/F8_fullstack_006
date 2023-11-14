import { client } from "./client";
import { ToastContainer, toast } from "react-toastify";

export const makeRequest = () => {
  return {
    type: "MAKE_REQUEST",
  };
};

export const getFailRequest = (err) => {
  return {
    type: "FAIL_REQUEST",
    payload: err,
  };
};

export const getProductList = (data) => {
  return {
    type: "GET_PRODUCT_LIST",
    payload: data,
  };
};

export const apiGetProductList = async (query = {}, dispatch) => {
  try {
    const queryString = new URLSearchParams(query).toString();
    const { data } = await client.get(`/products?${queryString}`);
    if (data.status_code !== "FAILED") {
      dispatch(getProductList(data.data));
      toast.success(data.message);
    } else {
      dispatch(getFailRequest(data.message));
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    console.log("Lỗi 401");
  }
};
