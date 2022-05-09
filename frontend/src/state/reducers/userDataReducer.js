import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//============== Getting user data from server ====================

export const getUsersData = createAsyncThunk(
  "admin/users",
  async (conditions) => {
    const { role, page } = conditions;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const response = await Axios.get(`/admin/users/${role}/${page}`, {
      headers: {
        authorization: `Bearer ${userInfo.authToken}`,
      },
    });
    return response.data.user;
  }
);

//============== Adding user data ====================

export const addUserData = createAsyncThunk(
  "admin/users/add",
  async (data, { getState }) => {
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.post("/admin/addUser", data, {
      header: { authorization: `Bearer ${userInfo.authToken}` },
    });
    console.log(response);
    return response.data;
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
      state.error = "Error occured While getting users Data";
    },
    [addUserData.fulfilled]: (state, action) => {
      console.log(action);
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    },
    [addUserData.pending]: (state, action) => {
      state.loading = true;
      console.log(action);
    },
    [addUserData.rejected]: (state, action) => {
      console.error(action);
      state.loading = false;
      state.error = "An error occured while addUser";
    },
    logout: (state, action) => {
      state.data = [];
      localStorage.removeItem("usersData");
      state.loading = false;
      state.error = "";
    },
  },
});

//====================== Exporting as reducer ===========================

export default usersDataReducer.reducer;
