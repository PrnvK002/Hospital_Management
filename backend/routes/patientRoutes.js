import express from 'express';
const router = express.Router();
import authentication from '../middlewares/authentication.js';
// import { authLogin , registerUser , sendOtp , homePage , getDoctors , fixingAppointment } from '../controllers/patientControllers.js';
import { authLogin,registerUser,sendOtp,getDoctors } from '../controllers/userController.js';
import { homePage } from '../controllers/departmentController.js';
import { fixingAppointment } from '../controllers/appointmentController.js';

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

router.get('/getDoctors/:id',getDoctors);

//@desc fix an appointment
//@access public 
//@route post /appointment

router.post('/appointment',authentication,fixingAppointment);


export default router;