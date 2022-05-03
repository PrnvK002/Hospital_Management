import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './reducers/userDataReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
    reducer : {
        userLogin : userReducer,
        usersData : userDataReducer
    }
})