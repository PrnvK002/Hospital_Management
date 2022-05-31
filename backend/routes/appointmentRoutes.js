import express from 'express';
import authenticationMiddleware from '../middlewares/authentication.js';
import { cancelAppointment, fixingAppointment, getActiveBooking, getAppointmentHistory, getAppointments} from '../controllers/appointmentController.js' 
const router = express.Router();

//@desc get currently active appointments
//@access public 
//@route get /appointment

router.get('/',authenticationMiddleware,getActiveBooking);

//@desc fix an appointment
//@access public 
//@route post /appointment

router.post('/',authenticationMiddleware,fixingAppointment);

//@desc get appointment history
//@access public 
//@route get /appointment/history

router.get('/history/:page',authenticationMiddleware,getAppointmentHistory);

//@desc see all appointments
//@access private doctor,staffs
//@route get /appointment/get

router.get('/get',authenticationMiddleware,getAppointments);

//@desc cancel appointment
//@access public 
//@route patch /appointment/cancel

router.patch('/cancel',authenticationMiddleware,cancelAppointment);


export default router;
