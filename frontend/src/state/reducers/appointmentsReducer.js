import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//================ get doctor specific appointments from backend(doctors) ==========

export const getAppointments = createAsyncThunk(
  "appointments/get/doctor",
  async (pageNumber, { getState , rejectWithValue }) => {
    const state = getState();
    const userInfo = state.userLogin.data;
    try{
      const response = await Axios.get(
        `/appointment/getAppointment?page=${pageNumber}&role=doctor&state=active`,
        { headers: { authorization: `Bearer ${userInfo.authToken}` } }
      );
      console.log(response);
      return response.data.appointments;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);

//====================== get all appointments of the day staff ==========================

export const getAllAppointmetns = createAsyncThunk(
  "appointments/get/staff",
  async (data, { getState , rejectWithValue }) => {
    const { page , status } = data;
    const state = getState();
    const userInfo = state.userLogin.data;
    try{
      const response = await Axios.get(
        `/appointment/getAppointment?page=${page}&role=staff&state=${status}`,
        { headers: { authorization: `Bearer ${userInfo.authToken}` } }
      );
      console.log(response);
      return response.data.appointments;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);

//=============== get active appointments of a user ==========

export const getActiveAppointments = createAsyncThunk(
  "appointments/active/get",
  async (status, { getState,rejectWithValue }) => {
    
    const state = getState();
    const userInfo = state.userLogin.data;
    try{
      const response = await Axios.get(`/appointment/getActive/${status}`, {
        headers: { authorization: `Bearer ${userInfo.authToken}` },
      });
      console.log(response);
      return response.data.appointment;
    }catch(err){
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

//=================== cancel Appointment ===================

export const cancelAppointment = createAsyncThunk(
  "appointment/cancel",
  async (id, { getState , rejectWithValue }) => {
    const state = getState();
    const userInfo = state.userLogin.data;
    try{
      const response = await Axios.patch("/appointment/cancel", {id : id}, {
        headers: { authorization: `Bearer ${userInfo.authToken}` },
      });
      return response.data;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);

//================= Add an appointment ==================

export const fixAppointment = createAsyncThunk(
  "appointments/add",
  async (data, { getState , rejectWithValue }) => {
    console.log(data);
    const state = getState();
    const userInfo = state.userLogin.data;
    try{
      const response = await Axios.post("/appointment", data, {
        headers: { authorization: `Bearer ${userInfo.authToken}` },
      });
      return response.data.data;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);

//==================== Appointment History ==============

export const getAppointmentHistory = createAsyncThunk(
  "appointments/get/history",
  async (page, { getState , rejectWithValue }) => {
    const state = getState();
    const userInfo = state.userLogin.data;
    try{
      const response = await Axios.get(`/appointment/history/${page}`, {
        headers: { authorization: `Bearer ${userInfo.authToken}` },
      });
      return response.data.appointments;
    }catch(err){
      return rejectWithValue(err.response.data)
    }
  }
);



//================ Creating Slice ===================

const appointmentReducer = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
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
    [getAppointments.fulfilled]: (state, action) => {
      state.appointments = action.payload || [] ;
      state.dataChanged = true;
      state.loading = false;
      state.error = "";
    },
    [getAppointments.pending]: (state, action) => {
      state.loading = false;
    },
    [getAppointments.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [fixAppointment.fulfilled]: (state, action) => {
      state.dataChanged = true;
      state.appointments = action.payload;
      state.loading = false;
    },
    [fixAppointment.pending]: (state, action) => {
      state.loading = true;
    },
    [fixAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getAppointmentHistory.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataChanged = true;
      state.appointments = action.payload;
    },
    [getAppointmentHistory.pending]: (state, action) => {
      state.loading = true;
    },
    [getAppointmentHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [cancelAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataChanged = true;
    },
    [cancelAppointment.pending]: (state, action) => {
      state.loading = true;
    },
    [cancelAppointment.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [getAllAppointmetns.fulfilled]: (state, action) => {
      state.appointments = action.payload || [] ;
      state.loading = false;
    },
    [getAllAppointmetns.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllAppointmetns.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getActiveAppointments.fulfilled]: (state, action) => {
      state.appointments = action.payload || [] ;
      state.loading = false;
    },
    [getActiveAppointments.pending]: (state, action) => {
      state.loading = true;
    },
    [getActiveAppointments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setDataChange } = appointmentReducer.actions;

export default appointmentReducer.reducer;
