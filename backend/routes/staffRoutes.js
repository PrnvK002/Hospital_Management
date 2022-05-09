import express from 'express';
import authenticationMiddleware from '../middlewares/authentication.js';
import { getAllAppointmetns } from '../controllers/appointmentController.js';
import { showPrescription , showUserPrescription } from '../controllers/prescriptionController.js';
import { addReport, getMedicalReport } from '../controllers/reportController.js';

const router = express.Router();

//@desc see all appointments
//@access private staff
//@route get /appointments

router.get('/appointments',authenticationMiddleware,getAllAppointmetns);

//@desc get medical reports of a user
//@access private doctor
//@route get /staff/reports/Id(userid);

//@desc get medical reports of a user
//@access private doctor
//@route get /staff/reports/Id(userid);

router.get('/reports/:id',authenticationMiddleware,getMedicalReport);


//@desc add report
//@access private staff
//@route post /report

router.post('/report',authenticationMiddleware,addReport);

//@desc show prescription
//@access private staff
//@route post /staff/userPrescription/id(userId)

router.get('/userPrescription/:id',authenticationMiddleware,showUserPrescription);

//@desc get single prescription
//@access private staff
//@route post /staff/prescription/id(prescriptionId)

router.get('/prescription/:id',authenticationMiddleware,showPrescription);

export default router;