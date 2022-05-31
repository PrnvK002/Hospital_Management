import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import Axios from '../../axios';

//============= Add prescription ==================
export const addPrescription = createAsyncThunk('prescription/add',async (data,{getState})=> {
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.post('/medicine/prescription',data,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    console.log(response);
    return response.data.prescriptionData;
});

//================== Get Prescription ==============
export const getPrescription = createAsyncThunk('prescription/get',async (id,{getState})=>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.get(`/medicine/prescription/${id}`,{ headers : { authorization : `Bearer ${userInfo.authToken}` }});
    return response.data;
});

//====================== prescription slice ================

const prescriptionReducer = createSlice({
    name : 'prescription',
    initialState : {
        prescription : {},
        loading : false,
        error : '',
        success : false
    },
    reducers : {
        resetSuccess : (state,action) => {
            state.success = false;
        }
    },
    extraReducers : {
        [getPrescription.fulfilled] : (state,action) => {
            state.prescription = action.payload;
            state.loading = false;
        },
        [getPrescription.pending] : (state,action) => {
            state.loading = true;
        },
        [getPrescription.rejected] : (state,action) => {
            state.loading = false;
            state.error = 'No Prescription found';
        },
        [addPrescription.fulfilled] : (state,action) => {
            state.prescription = action.payload;
            state.success = true;
            state.loading = false;
        },
        [addPrescription.pending] : (state,action) => {
            state.loading = true;
        },
        [ addPrescription.rejected ] : (state,action) => {
            state.loading = false;
            state.error = 'Cannot add Prescription';
        }
    }
});

export const { resetSuccess } = prescriptionReducer.actions;

export default prescriptionReducer.reducer;