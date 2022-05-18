import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//============== Getting user data from server ====================

export const getUsersData = createAsyncThunk(
  "admin/users",
  async (conditions, { getState }) => {
    const { role, page } = conditions;
    const state = getState();
    const userInfo = state.userLogin.data;
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
    console.log(data);
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.post("/admin/addUser", data, {
      headers: {
        authorization: `Bearer ${userInfo.authToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data.status;
  }
);

//=================== getting doctors of a specific departments ======================

export const getDoctorsOfDepartments = createAsyncThunk(
  "users/department",
  async (id, { getState }) => {
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.get(`/getDoctors/${id}`, {
      headers: { authorization: `Bearer ${userInfo.authToken}` },
    });
    return response.data.doctors;
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
      state.error = "Error occured While getting users Data";
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
      state.error = "An error occured while addUser";
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
      state.error = "Cannot get doctors data";
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
