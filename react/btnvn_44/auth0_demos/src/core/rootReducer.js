export const rootReducer = (state, action) => {
  switch (action.type) {
    case "load_initialization":
      return {
        ...state,
        loading: true,
      };
    case "load_success":
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case "load_err":
      return {
        ...state,
        err: action.data,
        data: [],
      };
    default:
      return state;
  }
};
