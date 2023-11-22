import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../config/client";

// Api
export const getTokenApi = createAsyncThunk("getTokenApi", async (email) => {
  const { data } = await client.get(`/api-key?email=${email}`);
  const apiKey = data.data.apiKey;
  localStorage.setItem("apiKey", apiKey);
  return data;
});

export const sliceLogin = createSlice({
  name: "login",
  initialState: {
    loading: false,
    messErr: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTokenApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTokenApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getTokenApi.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error);
        if (
          action.error.message ===
          "Cannot read properties of undefined (reading 'apiKey')"
        ) {
          state.messErr = "Tài khoản không tồn tại";
        } else {
          state.messErr = action.error.message;
        }
      });
  },
});
