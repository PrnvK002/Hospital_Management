import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//================== Getting all departments ==========================

export const getDepartments = createAsyncThunk("departments/get", async () => {
  const response = await Axios.get("/department");
  return response.data.departments;
});

//================== Adding departments ===================================

export const addDepartment = createAsyncThunk(
  "departments/add",
  async (data,{getState}) => {
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.post(
      "/department",
      data,
      {
        headers: {
          authorization: `Bearer ${userInfo.authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  }
);

//====================== for removing department ==================

export const removeDepartment = createAsyncThunk(
  "department/remove",
  async (id,{getState}) => {
    console.log('reaching removeDepartment');
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.delete(`/department/${id}`, {
      headers: { authorization: `Bearer ${userInfo.authToken}` },
    });
    console.log(response);
    return response.data;
  }
);

const departmentDataFromLocalStorage = localStorage.getItem("departmentInfo") ? JSON.parse(localStorage.getItem("departmentInfo")) : [] ;



const departmentReducer = createSlice({
  name: "departmentData",
  initialState: {
    departments: departmentDataFromLocalStorage,
    loading: false,
    error: "",
    dataChanged: false,
  },
  reducers : {
    setAddedStatus : (state) => {
      state.dataChanged = false;
    }
  },
  extraReducers: {
    [getDepartments.fulfilled]: (state, action) => {
      localStorage.setItem("departmentInfo", JSON.stringify(action.payload));
      state.departments = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getDepartments.pending]: (state, action) => {
      state.loading = true;
    },
    [getDepartments.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Cannot find Departments";
    },
    [addDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataChanged = true;
      state.error = "";
    },
    [addDepartment.pending]: (state, action) => {
      state.loading = true;
    },
    [addDepartment.rejected]: (state, action) => {
      console.log(action);
      state.error = "Error occured while adding new Department";
      state.loading = false
    },
    [removeDepartment.fulfilled]: (state, action) => {
      state.departments = action.payload;
      state.dataChanged = true;
      state.loading = false;
      state.error = "";
    },
    [removeDepartment.pending]: (state, action) => {
      state.loading = true;
    },
    [removeDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Error occured while removing the department";
    },
  },
});

export const { setAddedStatus } = departmentReducer.actions;

export default departmentReducer.reducer;
