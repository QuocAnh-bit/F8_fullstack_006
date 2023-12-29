import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slide/couterSlide";
import { todosSlice } from "./slide/todosSlide";
import { postApi } from "./services/postApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    refetchOnReconnect: true,
    todos: todosSlice.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), postApi.middleware];
  },
});

setupListeners(store.dispatch);
