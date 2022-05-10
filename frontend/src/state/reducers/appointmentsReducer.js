import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//================ getAppointments from backend ==========

const getAppointments = createAsyncThunk('appointments/get',async(_,{getState})=>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.get('/doctor/appointments',{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    console.log(response);
    return response.data.appointments;
});

//=============== get a single appointment of a user ==========

//================= Add an appointment ==================

const fixAppointment = createAsyncThunk('appointments/add',async (data,{getState})=>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.post('/appointment',data,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    return response.data;
});

//==================== Appointment History ==============

const getAppointmentHistory = createAsyncThunk('appointments/get/history',async (_,{getState}) =>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.get('/appointmentHistory',{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    return response.data;
});

//============= appointments from storage ==============

const appointmentsFromStorage = localStorage.getItem('appointments') ? JSON.parse(localStorage.getItem('appointments')) : [];
// const fixedAppointmentFromStorage = localStorage.getItem('fixedAppointment') ? JSON.parse(localStorage.getItem('bookedAppointment')) : {} ;
// const appointmentHistoryFromStorage = localStorage.getItem('appointmentHistory') ? JSON.parse(localStorage.getItem('appointmentHistory')) : [];
//================ Creating Slice ===================

const appointmentReducer = createSlice({
    name : 'appointments',
    initialState : {
        appointments : appointmentsFromStorage,
        loading : false,
        error : '',
        dataChanged : false
    },
    reducers : {
        setDataChange: (state) => {
            state.dataChanged = false;
          },
    },
    extraReducers : {
        [getAppointments.fulfilled] : (state,action)=>{
            state.appointments = action.payload;
            state.dataChanged = true;
            state.loading = false;
            state.error = '';
        },
        [getAppointments.pending] : (state,action)=>{
            state.loading = false;
        },
        [getAppointments.rejected] : (state,action)=>{
            state.error = 'Cannot get Appointments';
            state.loading = false;
        },
        [fixAppointment.fulfilled] : (state,action)=>{
            state.dataChanged = true;
            state.appointments = action.payload;
            state.loading = false;
        },
        [fixAppointment.pending] : (state,action)=>{
            state.loading = true;
        },
        [fixAppointment.rejected] : (state,action)=>{
            state.loading = false;
            state.error = 'Cannot get fixed appointment';
        },
        [getAppointmentHistory.fulfilled] : (state,action)=>{
            state.dataChanged = true;
            state.appointments = action.payload;
            state.loading = false;
        },
        [getAppointmentHistory.pending] : (state,action)=>{
            state.loading = true;
        },
        [getAppointmentHistory.rejected] : (state,action)=>{
            state.loading= false;
            state.error = 'Cannot get appointment History';
        },
    }

});

export const { setDataChange } = appointmentReducer.actions;

export default appointmentReducer.reducers;