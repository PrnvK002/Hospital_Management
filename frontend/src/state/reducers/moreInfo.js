import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//================ getting more information about a perticular user ===================
export const getMoreInfo = createAsyncThunk("moreInfo", async (id,{getState,rejectWithValue}) => {
  console.log(id);
  const state = getState();
  const userInfo = state.userLogin.data;
  try{
    const response = await Axios.get(`/user/${id}`,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    return response.data.user;
  }catch(err){
    return rejectWithValue(err.response.data);
  }
});

//================= Slice for moreInfo data ========================

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
      state.error = action.payload.message;
      state.loading = false;
    },
  },
});

export default moreInfo.reducer;
