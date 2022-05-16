import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

//================ get doctor specific appointments from backend(doctors) ==========

export const getAppointments = createAsyncThunk('appointments/get/doctor',async(pageNumber,{getState})=>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.get(`/doctor/appointments/${pageNumber}`,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    console.log(response);
    return response.data.appointments;
});

//====================== get all appointments of the day ==========================

export const getAllAppointmetns = createAsyncThunk('appointments/get/staff',async(pageNumber,{getState})=>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.get(`/staff/appointments/${pageNumber}`,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    return response.data.appointments;
})

//=============== get active appointments of a user ==========

export const getActiveAppointments = createAsyncThunk('appointments/active/get',async(_,{getState}) => {
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.get('/appointment',{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    console.log(response.data);
    return response.data.appointment;
} )

//=================== cancel Appointment ===================

export const cancelAppointment = createAsyncThunk('appointment/cancel',async (id,{getState})=>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.patch('/appointment/cancel',id,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    return response.data;
})

//================= Add an appointment ==================

export const fixAppointment = createAsyncThunk('appointments/add',async (data,{getState})=>{
    console.log(data);
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.post('/appointment',data,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    return response.data.data;
});

//==================== Appointment History ==============

export const getAppointmentHistory = createAsyncThunk('appointments/get/history',async (page,{getState}) =>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.get(`/appointmentHistory/${page}`,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    return response.data.appointments;
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
        [ cancelAppointment.fulfilled ] : (state,action)=>{
            state.loading = false;
            state.dataChanged = true;
        },
        [ cancelAppointment.pending ] : (state,action) =>{
            state.loading = true;
        },
        [cancelAppointment.rejected] :(state,action) => {
            state.error = 'Errror occured while canceling the appointment';
            state.loading = false;
        },
        [ getAllAppointmetns.fulfilled ] : (state,action) => {
            state.appointments = action.payload;
            state.loading = false;
        },
        [getAllAppointmetns.pending] : (state,action) => {
            state.loading = true;
        },
        [getAllAppointmetns.rejected] : (state,action) =>{
            state.loading = false;
            state.error = 'Cannot get appointments';
        },
        [ getActiveAppointments.fulfilled ] : (state,action) => {
            state.appointments = action.payload;
            state.loading = false;
        },
        [getActiveAppointments.pending] : (state,action) => {
            state.loading = true
        },
        [getActiveAppointments.rejected] : (state,action) => {
            state.loading = false;
            state.error = 'Cannot find Active appointments';
        }
    }

});

export const { setDataChange } = appointmentReducer.actions;

export default appointmentReducer.reducer;