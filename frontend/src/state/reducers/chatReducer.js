import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../axios';


//=================== getting all messages ===========================
export const getAllMessages = createAsyncThunk('chat/get',async( id , { getState, rejectWithValue } )=>{
    const state = getState();
    const userInfo = state.userLogin.data;
    try{
        const response = await Axios.get(`/chat/${id}`,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
        console.log(response);
        return response.data.messages;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

const chatReducer = createSlice({
    name : 'chat',
    initialState : {
        messages : [],
        loading : false,
        error : '' 
    },
    extraReducers : {
        [ getAllMessages.fulfilled ] : (state,action) => {
            state.messages = action.payload;
            state.loading = false;
        },
        [ getAllMessages.pending ] : (state,action) => {
            state.loading = true;
        },
        [ getAllMessages.rejected ] : (state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    }
});


export default chatReducer.reducer;