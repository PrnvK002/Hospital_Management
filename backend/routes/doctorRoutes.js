import express from 'express';
import authenticationMiddleware from '../middlewares/authentication.js';
import { getAppointments} from '../controllers/appointmentController.js' 
import { addPrescription } from '../controllers/prescriptionController.js'; 
import { getMedicalReport } from '../controllers/reportController.js';
const router = express.Router();

//@desc see all appointments
//@access private doctor
//@route get /appointments

router.get('/appointments/:page',authenticationMiddleware,getAppointments);

//@desc Add prescription
//@access private doctor
//@route get /addPrescription

router.post('/prescription',authenticationMiddleware,addPrescription);

//@desc get medical reports
//@access private doctor
//@route get /reports

router.get('/reports/:id',authenticationMiddleware,getMedicalReport);

//@desc request for medical reports
//@access private doctor
//@route 


export default router;