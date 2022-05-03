import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

export const loginUser = createAsyncThunk("/login", async ({email, password}) => {
  
    let response = await Axios.post("/login", { email, password });
    return response.data;

});


export const signupUser = createAsyncThunk('/signup',async(data)=>{

    let response = await Axios.post('/sendOtp',{ phone : data.phone });
    if(response.data.otp){
      return { ...data , otp : response.data.otp }
    }

})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') ) : {};

const userReducer = createSlice({
  name: "userLogin",
  initialState: {
    data: userInfoFromStorage,
    error: "",
    loading: false,
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
     
      console.log(action.payload);
      localStorage.setItem('userInfo',JSON.stringify(action.payload));
      state.data = action.payload;
      state.loading = false;
    },
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.rejected]: (state, action) => {
      console.log("------rejected---------");
      console.log(action);
      state.error = "Invalid credentials";
      state.loading = false;

    },
    [signupUser.fulfilled]: (state,action)=>{
      state.data = action.payload;
      state.loading = false;
    },
    [signupUser.pending]: (state,action)=>{
      state.loading = true;
    },
    [signupUser.rejected]: (state,action)=>{
      state.error = "Some error occured please check the credentials you entered";
      state.loading = false;
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
