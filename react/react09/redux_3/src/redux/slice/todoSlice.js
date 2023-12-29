import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  todoList: [],
  status: "idle",
};

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    update: (state, action) => {
      state.todoList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todoList = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.status = "error";
    });
  },
});

/*
createAsyncThunk Status
- pending
- fullfill
- 
*/
// redux thunk
// export const fetchTodos = () => {
//   return async (dispatch) => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/todos");
//     const data = await response.json();
//     dispatch(todoSlice.actions.update(data));
//   };
// };
