import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "../middlewares/todomiddleware";

const initialState = {
  listTodo: [],
};
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.listTodo = action.payload;
    });
  },
});
