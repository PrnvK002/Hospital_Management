import express from 'express';
const router = express.Router();
import authentication from '../middlewares/authentication.js';
import { authLogin,registerUser,sendOtp,getDoctors } from '../controllers/userController.js';
import { homePage } from '../controllers/departmentController.js';
import { fixingAppointment , getAppointmentHistory , getActiveBooking , cancelAppointment } from '../controllers/appointmentController.js';
import authenticationMiddleware from '../middlewares/authentication.js';

//@desc route for login permision
//@access public

router.post('/login',authLogin);

//@desc route for login permision
//@access public

router.post('/signup',registerUser);

//@desc route for sending otp
//@access public

router.post('/sendOtp',sendOtp);

//@desc home page , department data
//@access public 
//@route get /

router.get('/',homePage);

//@desc department specific doctors
//@access public 
//@route get /getDoctors/:department Id

router.get('/getDoctors/:id',authenticationMiddleware,getDoctors);

//@desc fix an appointment
//@access public 
//@route post /appointment

router.post('/appointment',authentication,fixingAppointment);

//@desc get appointment history
//@access public 
//@route get /appointmentHistory

router.get('/appointmentHistory/:page',authenticationMiddleware,getAppointmentHistory);

//@desc get currently active appointments
//@access public 
//@route get /appointment

router.get('/appointment',authenticationMiddleware,getActiveBooking);

//@desc cancel appointment
//@access public 
//@route patch /appointment/cancel

router.patch('/appointment/cancel',authenticationMiddleware,cancelAppointment);

export default router;