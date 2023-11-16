import { legacy_createStore as createStore } from "redux";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";
const initialState = {
  loading: true,
  productList: [],
  errMessage: "",
  carts: getLocalStorage("cart") || [],
  detail: null,
  idProduct: null,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MAKE_REQUEST":
      return { ...state, loading: true };
    case "FAIL_REQUEST":
      return { ...state, loading: false, errMessage: action.payload };
    case "GET_PRODUCT_LIST":
      return {
        ...state,
        loading: false,
        errMessage: "",
        productList: action.payload,
      };
    case "GET_DETAIL":
      return { ...state, detail: action.payload, loading: false };
    case "RESET_DETAIL":
      return { ...state, detail: null };
    case "ADD_TO_CART":
      return { ...state, carts: action.payload };
    case "RESET_CART":
      return { ...state, carts: [] };

    default:
      return state;
  }
};

export const store = createStore(rootReducer);
