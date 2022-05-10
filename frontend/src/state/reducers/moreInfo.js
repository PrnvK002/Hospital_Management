import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

export const getMoreInfo = createAsyncThunk("moreInfo", async (id,{getState}) => {
  console.log(id);
  const state = getState();
  const userInfo = state.userLogin.data;
  const response = await Axios.get(`/admin/user/${id}`,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
  console.log(response);
  return response.data.user;
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
