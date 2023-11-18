import { configureStore } from "@reduxjs/toolkit";
import { sliceLogin } from "./slice/loginSlice";
import { sliceTrello } from "./slice/trelloSlice";
const rootReducer = {
  reducer: {
    login: sliceLogin.reducer,
    trello: sliceTrello.reducer,
  },
};

export const store = configureStore(rootReducer);
