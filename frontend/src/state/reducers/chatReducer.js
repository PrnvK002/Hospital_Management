import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../axios';


//=================== getting all messages ===========================
export const getAllMessages = createAsyncThunk('chat/get',async( id , { getState } )=>{
    const state = getState();
    const userInfo = state.userLogin.data;
    const response = await Axios.get(`/chat/${id}`,{ headers : { authorization : `Bearer ${userInfo.authToken}` } });
    console.log(response);
    return response.data.messages;
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
            state.error = 'No chat history';
        }
    }
});


export default chatReducer.reducer;