import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sliceTrello = createSlice({
  name: "trello",
  initialState: {
    listCol: [],
    listTask: [],
  },
  reducers: {
    addCol: (state, action) => {
      state.listCol = [...state.listCol, action.payload];
    },
    deleteCol: (state, action) => {
      state.listCol = state.listCol.filter((col) => col._id !== action.payload);
    },
    addTask: (state, action) => {
      state.listTask = [...state.listTask, action.payload];
    },
    deleteTask: (state, action) => {
      state.listTask = state.listTask.filter(
        (task) => task._id !== action.payload
      );
    },
    updateListCol: (state, active) => {
      state.listCol = active.payload;
    },
  },
});
