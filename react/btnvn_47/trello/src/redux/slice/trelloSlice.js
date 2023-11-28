import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../config/client";

export const getTasksApi = createAsyncThunk("getTasksApi", async () => {
  const apiKey = localStorage.getItem("apiKey");
  const { data } = await client.get(`/tasks`, null, apiKey);
  console.log(data);
  return data.data;
});

export const updateData = createAsyncThunk("updateData", async (newData) => {
  const apiKey = localStorage.getItem("apiKey");
  const response = await client.post("/tasks", newData, apiKey);
  return response.data;
});

export const sliceTrello = createSlice({
  name: "trello",
  initialState: {
    data: null,
    totalTask: null,
    itemDragType: null,
    itemDragData: null,
    loading: false,
  },
  reducers: {
    addCol: (state, action) => {
      state.data.push(action.payload);
    },
    deleteCol: (state, action) => {
      state.listCol = state.listCol.filter((col) => col._id !== action.payload);
    },
    addTask: (state, action) => {
      const findColumn = state.data.find(
        (col) => col.column === action.payload.column
      );
      if (findColumn) {
        findColumn.tasks.push(action.payload);
      }
    },
    updateListTask: (state, action) => {
      state.listTask = action.payload;
    },
    deleteTask: (state, action) => {
      const listTask = state.data.findIndex(
        (item) => item.column === action.payload.column
      );
      console.log("Ok");
      state.data[listTask].tasks.filter(
        (item) => item._id !== action.payload._id
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
    sortTask: (state, action) => {
      const source = action.payload.source;
      const destination = action.payload.destination;
      const sourceColumn = state.data.find((column) => {
        return column.column === source.droppableId;
      });
      const destinationColumn = state.data.find((column) => {
        return column.column === destination.droppableId;
      });

      const [reorderedTask] = sourceColumn.tasks.splice(source.index, 1);
      reorderedTask.column = destinationColumn.column;
      destinationColumn.tasks.splice(destination.index, 0, reorderedTask);
    },
    sortColumn: (state, action) => {
      const source = action.payload.source;
      const destination = action.payload.destination;
      const [reorderedColumn] = state.data.splice(source.index, 1);
      state.data.splice(destination.index, 0, reorderedColumn);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasksApi.fulfilled, (state, action) => {
        state.loading = false;
        state.totalTask = action.payload.tasks.length;
        state.data = getData(action.payload);
        console.log(state.data);
      })
      .addCase(getTasksApi.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error);
      })
      .addCase(updateData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error);
      });
  },
});

export const getData = (data) => {
  const columns = data.columns;
  const tasks = data.tasks;
  return columns.map((column) => {
    const tasksFilter = tasks.filter((task) => column.column === task.column);
    return {
      ...column,
      tasks: tasksFilter,
    };
  });
};
