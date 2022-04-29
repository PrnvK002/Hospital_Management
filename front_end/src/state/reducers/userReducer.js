import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

export let loginUser = createAsyncThunk("/login", async ({email, password}) => {
  try {
    let response = await Axios.post("/login", { email, password });
  } catch (error) {
    console.log(error);
    console.error("Some sort of error occured please check your credentials");
  }
});

const userReducer = createSlice({
  name: "userLogin",
  initialState: {
    data: {},
    error: "",
    loading: false,
  },
  extraReducers: {
    [loginUser.fullfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.error = "Some error occured please check your credentails";
    },
    logout : ( state , action ) => {
        state.data = {};
        state.loading = false;
        state.error = "";
        localStorage.removeItem('userInfo');
    }
  },
});

export default userReducer.reducer;
