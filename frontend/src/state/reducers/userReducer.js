import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//================= login user ===================
export const loginUser = createAsyncThunk(
  "/login",
  async ({ email, password },{rejectWithValue}) => {
    try{
      const response = await Axios.post("/login", { email, password });
      return response.data;
    }catch(err){
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

//================= Profile Update ==============

export const updateProfile = createAsyncThunk('user/update', async (data, { getState , rejectWithValue }) => {
  const state = getState();
  const userInfo = state.userLogin.data;
  try{
    const response = await Axios.put('/profile', data, { headers: { authorization: `Bearer ${userInfo.authToken}` } });
    // console.log(response);
    return response.data;
  }catch(err){
    return rejectWithValue(err.response.data);
  }
})

//===================== send otp user ===============
export const signupUser = createAsyncThunk("/signup", async (data,{rejectWithValue}) => {

  try{
    const response = await Axios.post("/sendOtp", { phone: data.phone });
    if (response.data.otp) {
    return { ...data, otp: response.data.otp };
    }
  }catch(err){
    return rejectWithValue(err.response.data);
  }
});

//==================== google login ==================
export const googleAuth = createAsyncThunk('login/google/auth',async (data,{rejectWithValue})=>{
  try{
    const response = await Axios.post('/google/auth',{ googleId : data});
    return response.data;
  }catch(err){
    return rejectWithValue(err.response.data);
  }
});

//==================== google register ===============
export const googleRegister = createAsyncThunk('register/google/register',async (data,{rejectWithValue})=>{
  try{
    const response = await Axios.post('/google/register',data);
    return response.data;
  }catch(err){
    return rejectWithValue(err.response.data);
  }
});

//==================== create user ==================
export const createUser = createAsyncThunk(
  "signup/create",
  async (userData,{rejectWithValue}) => { 
    console.log(userData,'dsfsafsf');
    const data = {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      confirm_password: userData.password,
      gender: userData.gender,
      phone: userData.phone,
      age: userData.age,
    };
    try{
      const response = await Axios.post("/signup", { ...data });
      return response.data;
    }catch(err){
      console.log(err);
      console.log(err.response);
      return rejectWithValue(err.response.data);
    }
  }
);

//===================== user data from storage ============

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

//==================== creating slice ==================
const userReducer = createSlice({
  name: "userLogin",
  initialState: {
    signupTemp:{},
    data: userInfoFromStorage,
    error: "",
    success:false,
    loading: false,
  },reducers:{
    resetSuccess:(state,action)=>{
      state.success = false;
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.data = action.payload;
      state.loading = false;
    },
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.signupTemp = action.payload;
      state.loading = false;
    },
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signupUser.rejected]: (state, action) => {
      state.error =action.payload.message;
      state.loading = false;
    },
    [createUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.success = true;
      state.loading = false;
      state.error = "";
    },
    [createUser.pending]: (state, action) => {
      state.loading = true;
    },
    [createUser.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [updateProfile.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.loading = false;
    },
    [updateProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [googleAuth.fulfilled]:(state,action)=>{
      state.data = action.payload;
      state.loading = false;
    },
    [googleAuth.pending]:(state,action)=>{
      state.loadingl = true;
    },
    [googleAuth.rejected]:(state,action)=>{
      state.loading = false;
      state.error = action.payload.message;
    },
    [googleRegister.fulfilled]:(state,action)=>{
      state.data = action.payload;
      state.loading = false;
    },
    [googleRegister.pending]:(state,action)=>{
      state.loading = true;
    },
    [googleRegister.rejected]:(state,action)=>{
      state.error = action.payload.message;
      state.loading = false;
    },
    logout: (state, action) => {
      state.data = {};
      state.loading = false;
      state.error = "";
      localStorage.removeItem("userInfo");
    },
  },
});

export const { resetUpdate , resetSuccess } = userReducer.actions;

export default userReducer.reducer;
