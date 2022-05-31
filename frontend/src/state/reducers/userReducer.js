import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//================= login user ===================
export const loginUser = createAsyncThunk(
  "/login",
  async ({ email, password }) => {
    const response = await Axios.post("/login", { email, password });
    return response.data;
  }
);

//================= Profile Update ==============

export const updateProfile = createAsyncThunk('user/update', async (data, { getState }) => {
  const state = getState();
  const userInfo = state.userLogin.data;
  const response = await Axios.put('/profile', data, { headers: { authorization: `Bearer ${userInfo.authToken}` } });
  // console.log(response);
  return response.data;
})

//===================== send otp user ===============
export const signupUser = createAsyncThunk("/signup", async (data) => {
  console.log(data);
  const response = await Axios.post("/sendOtp", { phone: data.phone });
  if (response.data.otp) {
    return { ...data, otp: response.data.otp };
  }
});

//==================== create user ==================
export const createUser = createAsyncThunk(
  "signup/create",
  async (userData) => {
    localStorage.removeItem("userInfo");
    const data = {
      email: userData.email,
      username: userData.name,
      password: userData.password,
      confirm_password: userData.password,
      gender: userData.gender,
      phone: userData.phone,
      age: userData.age,
    };
    const response = await Axios.post("/signup", { ...data });
    return response.data;
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
    data: userInfoFromStorage,
    error: "",
    loading: false,
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
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
    [signupUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signupUser.rejected]: (state, action) => {
      state.error =
        "Some error occured please check the credentials you entered";
      state.loading = false;
    },
    [createUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    },
    [createUser.pending]: (state, action) => {
      state.loading = true;
    },
    [createUser.rejected]: (state, action) => {
      state.error = "Error occured while creating the user";
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
      state.error = 'Error occured while updating the profile';
    },
    logout: (state, action) => {
      console.log("Logged out");
      state.data = {};
      state.loading = false;
      state.error = "";
      localStorage.removeItem("userInfo");
    },
  },
});

export const { resetUpdate } = userReducer.actions;

export default userReducer.reducer;
