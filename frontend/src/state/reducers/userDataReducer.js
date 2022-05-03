import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

export const getUsersData = createAsyncThunk('/admin/users',async(role,page)=>{
    const userInfo = JSON.parse(localStorage('userInfo'));
    const response = await Axios.get(`/admin/users/${role}/${page}`,{ 
        headers : {
            authorization : `Bearer ${userInfo.authToken}`
        }
     })
     return response.data;
})

const usersDataFromStorage = localStorage.getItem('usersData') ? JSON.parse(localStorage.getItem('usersData')) : [];

const usersDataReducer = createSlice({
    name : "UsersData",
    initialState : {
        data : usersDataFromStorage,
        loading : false,
        error : ''
    },
    extraReducers : {
        [getUsersData.fulfilled] : (state,action) =>{
            state.data = action.payload;
            state.loading = false;
            state.error = "";
        },
        [getUsersData.pending] : (state,action) =>{
            state.loading = true;
        },
        [getUsersData.rejected] : (state,action) => {
            state.loading = false;
            state.error = "Error occured While getting users Data";
        },
        logout : (state,action) => {
            state.data = [];
            localStorage.removeItem('usersData');
            state.loading = false;
            state.error = "";
        }
    }
}) 

export default usersDataReducer.reducer;