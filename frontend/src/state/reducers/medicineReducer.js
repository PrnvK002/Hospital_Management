import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import Axios from '../../axios';

//============ Adding medicines ================

export const addMedicine = createAsyncThunk('medicine/add',async (data,{getState})=>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.post('/medicine',data,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    console.log(response);
    return response.data.data;
});

//============== getting medicines ============

export const getMedicineDetails = createAsyncThunk('medicine/get',async (page,{getState})=>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.get(`/medicine?page=${page}`,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    console.log(response);
    return response.data.medicineData;
});


//============= medicine slice =========

const medicineReducer = createSlice({
    name : 'medicine',
    initialState : {
        medicines : [],
        loading : false,
        error : '',
        update : false
    },
    reducers : {
        resetUpdate : (state,action)=>{
            state.update = false;
        }
    },
    extraReducers : {
        [ addMedicine.fulfilled ] : (state,action) =>{
            state.update = true;
            state.medicines = action.payload;
            state.loading = false;
        },
        [ addMedicine.pending ] : (state,action) =>{
            state.loading = true;
        },
        [ addMedicine.rejected ] : (state,action) =>{
            state.error = 'Error occured while adding medicine';
            state.loading = false;
        },
        [getMedicineDetails.fulfilled] : (state,action) => {
            state.medicines = action.payload;
            state.loading = false;
        },
        [getMedicineDetails.pending] : (state,action) => {
            state.loading = true;
        },
        [getMedicineDetails.rejected] : (state,action) => {
            state.error = 'No medicine Details found';
            state.loading =false;
        }
    }
});

export const { resetUpdate } = medicineReducer.actions;

export default medicineReducer.reducer;
