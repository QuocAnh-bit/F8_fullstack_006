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
    addTask: (state, action) => {
      state.listTask = [...state.listTask, action.payload];
    },
    sortColNew: (state, active) => {
      state.listCol = active.payload;
    },
  },
});
