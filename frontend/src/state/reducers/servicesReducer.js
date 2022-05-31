import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//=================== getServices ========================
export const getServices = createAsyncThunk("services/get", async () => {
  const response = await Axios.get("/services");
  return response.data.services;
});

//=================== adding services =================

export const createServices = createAsyncThunk(
  "services/post",
  async (data, { getState }) => {
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.post("/services", data, {
      headers: { authorization: `Bearer ${userInfo.authToken}` },
    });
    return response.data.service;
  }
);

//=================== Remove Service =================

export const removeService = createAsyncThunk('services/remove',async(id,{getState}) => {

    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.delete(`/services/remove/${id}`,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    return response.data;

})

//================ services from storage ====================

const servicesFromStorage = localStorage.getItem("services")
  ? JSON.parse(localStorage.getItem("services"))
  : [];

//================= creating Slice =========================

const serviceReducer = createSlice({
  name: "services",
  initialState: {
    services: servicesFromStorage,
    loading: false,
    error: "",
    dataChanged : false
  },
  reducers:{
      resetChange : (state,action) => {
          state.dataChanged = false;
      }
  },
  extraReducers: {
    [getServices.fulfilled]: (state, action) => {
        localStorage.setItem('services',JSON.stringify(action.payload));
        state.services = action.payload;
        state.loading = false;
        state.error = '';
    },
    [getServices.pending]: (state, action) => {
        state.loading = true;
    },
    [getServices.rejected]: (state, action) => {
        state.loading = false;
        state.error = 'No services found';
    },
    [createServices.fulfilled]: (state, action) => {
        // state.services.push(action.payload);
        state.dataChanged = true;
        state.loading = false;
        state.error = '';
    },
    [createServices.pending]: (state, action) => {
        state.loading = true;
    },
    [createServices.rejected]: (state, action) => {
        state.loading = false;
        state.error = 'Some error occured while adding services';
    },
    [removeService.fulfilled] : (state,action) => {
        state.data = action.payload;
        state.dataChanged = true;
        state.loading = false;
    },
    [removeService.pending] : (state,action) => {
        state.loading = true;
    },
    [removeService.rejected] : (state,action) => {
        state.loading = false;
        state.error = 'Cannot remove service';
    }
  },
});

export const {resetChange} = serviceReducer.actions;

export default serviceReducer.reducer;