import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../config/client";

export const getTasksApi = createAsyncThunk("getTasksApi", async () => {
  const apiKey = localStorage.getItem("apiKey");
  const { data } = await client.get(`/tasks`, null, apiKey);
  console.log(data);
  return data.data;
});

export const sliceTrello = createSlice({
  name: "trello",
  initialState: {
    listCol: [],
    listTask: [],
    itemDragId: null,
    itemDragType: null,
    itemDragData: null,
    loading: false,
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
    updateListTask: (state, action) => {
      state.listTask = action.payload;
    },
    deleteTask: (state, action) => {
      state.listTask = state.listTask.filter(
        (task) => task._id !== action.payload
      );
    },
    updateListCol: (state, active) => {
      state.listCol = active.payload;
    },
    setItemDragId: (state, action) => {
      state.itemDragId = action.payload;
    },
    setItemDragType: (state, action) => {
      state.itemDragType = action.payload;
    },
    setItemDragData: (state, action) => {
      state.itemDragData = action.payload;
    },
    resetItemsDrag: (state) => {
      state.itemDragId = null;
      state.itemDragType = null;
      state.itemDragData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasksApi.fulfilled, (state, action) => {
        state.loading = false;
        state.listCol = action.payload.columns;
        state.listTask = action.payload.tasks;
      })
      .addCase(getTasksApi.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error);
      });
  },
});
