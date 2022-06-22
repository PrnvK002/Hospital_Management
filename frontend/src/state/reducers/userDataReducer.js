import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//============== Getting user data from server ====================

export const getUsersData = createAsyncThunk(
  "admin/users",
  async (conditions, { getState , rejectWithValue }) => {
    const { role, page } = conditions;
    const state = getState();
    const userInfo = state.userLogin.data;
    try{
      const response = await Axios.get(`/users/${role}/${page}`, {
        headers: {
          authorization: `Bearer ${userInfo.authToken}`,
        },
      });
      return response.data.user;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);

//============== Adding user data ====================

export const addUserData = createAsyncThunk(
  "admin/users/add",
  async (data, { getState , rejectWithValue }) => {
    console.log(data);
    const state = getState();
    const userInfo = state.userLogin.data;
    try{
      const response = await Axios.post("/user", data, {
        headers: {
          authorization: `Bearer ${userInfo.authToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.status;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);

//=================== getting doctors of a specific departments ======================

export const getDoctorsOfDepartments = createAsyncThunk(
  "users/department",
  async (id, { getState,rejectWithValue }) => {
    const state = getState();
    const userInfo = state.userLogin.data;
    try{
      const response = await Axios.get(`/getDoctors/${id}`, {
        headers: { authorization: `Bearer ${userInfo.authToken}` },
      });
      return response.data.doctors;
    }catch(err){
      return rejectWithValue(err.response.data)
    }
  }
);

//======================= getting intitial state from storage ===========

const usersDataFromStorage = localStorage.getItem("usersData")
  ? JSON.parse(localStorage.getItem("usersData"))
  : [];

//======================= Slice ==========================================

const usersDataReducer = createSlice({
  name: "UsersData",
  initialState: {
    data: usersDataFromStorage,
    loading: false,
    error: "",
    dataChanged: false,
  },
  reducers: {
    setDataChange: (state) => {
      state.dataChanged = false;
    },
  },
  extraReducers: {
    [getUsersData.fulfilled]: (state, action) => {
      localStorage.setItem("usersData", JSON.stringify(action.payload));
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getUsersData.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsersData.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.payload.message;
    },
    [addUserData.fulfilled]: (state, action) => {
      console.log(action);
      state.dataChanged = true;
      state.data.push(action.payload);
      state.loading = false;
      state.error = "";
    },
    [addUserData.pending]: (state, action) => {
      state.loading = true;
    },
    [addUserData.rejected]: (state, action) => {
      console.error(action);
      state.loading = false;
      state.error = action.payload.message;
    },
    [getDoctorsOfDepartments.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.dataChanged = true;
    },
    [getDoctorsOfDepartments.pending]: (state, action) => {
      state.loading = true;
    },
    [getDoctorsOfDepartments.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    logout: (state, action) => {
      state.data = [];
      localStorage.removeItem("usersData");
      state.loading = false;
      state.error = "";
    },
  },
});

//====================== actions =========================

export const { setDataChange } = usersDataReducer.actions;

//====================== Exporting as reducer ===========================

export default usersDataReducer.reducer;
