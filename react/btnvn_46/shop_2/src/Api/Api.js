import { setLocalStorage } from "../utils/localStorage";
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
export const getProductDetail = (data) => {
  return {
    type: "GET_DETAIL",
    payload: data,
  };
};

export const apiGetProductList = async (query = {}, dispatch) => {
  try {
    dispatch(makeRequest());
    const queryString = new URLSearchParams(query).toString();
    const { data } = await client.get(`/products?${queryString}`);
    if (data.status_code !== "FAILED") {
      dispatch(getProductList(data.data));
    } else {
      dispatch(getFailRequest(data.message));
    }
  } catch (error) {
    console.log(error);
    console.log("Lỗi 401");
  }
};

export const apiGetProductDetails = async (id, dispatch) => {
  try {
    dispatch(makeRequest());
    const { data } = await client.get(`/products/${id}`);
    if (data.status_code !== "FAILED") {
      dispatch(getProductDetail(data.data));
      setLocalStorage("detail", data.data);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    console.log("Lỗi 401");
  }
};
