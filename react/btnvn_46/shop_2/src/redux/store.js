import { legacy_createStore as createStore } from "redux";

const initialState = {
  loading: true,
  productList: [],
  errMessage: "",
  carts: [],
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
    case "ADD_TO_CART":
      return { ...state, carts: action.payload };

    default:
      return state;
  }
};

export const store = createStore(rootReducer);
