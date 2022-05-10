import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './reducers/userDataReducer';
import userReducer from './reducers/userReducer';
import departmentReducer from './reducers/departmentReducer';
import moreInfo from './reducers/moreInfo';
import appointmentsReducer from './reducers/appointmentsReducer';

export const store = configureStore({
    reducer : {
        userLogin : userReducer,
        usersData : userDataReducer,
        departmentData : departmentReducer,
        moreInfo : moreInfo,
        appointmentData : appointmentsReducer
    }
});  