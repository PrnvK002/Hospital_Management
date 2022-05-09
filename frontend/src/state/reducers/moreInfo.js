import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

export const getMoreInfo = createAsyncThunk("moreInfo", async (id) => {
  const response = await Axios.get(`/admin/user/${id}`);
  return response.data;
});

const moreInfo = createSlice({
  name: "moreInfo",
  initialState: {
    data: {},
    loading: false,
    error: "",
  },
  extraReducers: {
    [getMoreInfo.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getMoreInfo.pending]: (state, action) => {
      console.log(action);
      state.loading = true;
      state.data = {};
      state.error = "";
    },
    [getMoreInfo.rejected]: (state, action) => {
      console.log(action);
      state.data = {};
      state.error = "Error occured while getting more info";
      state.loading = false;
    },
  },
});

export default moreInfo.reducer;
