import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './reducers/userDataReducer';
import userReducer from './reducers/userReducer';
import departmentReducer from './reducers/departmentReducer';
import moreInfo from './reducers/moreInfo';
import appointmentsReducer from './reducers/appointmentsReducer';
import servicesReducer from './reducers/servicesReducer';
import chatReducer from './reducers/chatReducer';
import medicineReducer from './reducers/medicineReducer';
import prescriptionReducer from './reducers/prescriptionReducer';

export const store = configureStore({
    reducer : {
        userLogin : userReducer,
        usersData : userDataReducer,
        departmentData : departmentReducer,
        moreInfo : moreInfo,
        appointmentData : appointmentsReducer,
        services : servicesReducer,
        chats : chatReducer,
        medicineData : medicineReducer,
        prescriptionData : prescriptionReducer
    },
    devTools : false
});  