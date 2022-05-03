import express from 'express';
const router = express.Router();
import authentication from '../middlewares/authentication.js'
import { authLogin , registerUser , sendOtp } from '../controllers/patientControllers.js';


//@desc route for login permision
//@access public

router.post('/login',authLogin);

//@desc route for login permision
//@access public

router.post('/signup',registerUser);

//@desc route for sending otp
//@access public

router.post('/sendOtp',sendOtp);

export default router;