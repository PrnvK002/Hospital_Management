import express from 'express';
import authenticationMiddleware from '../middlewares/authentication.js';
import { addPrescription, showPrescription, getMedicines , addMedicine } from '../controllers/medicineController.js'; 
const router = express.Router();


//@desc Add prescription
//@access private doctor
//@route post /medicine/prescription

router.post('/prescription',authenticationMiddleware,addPrescription);

//@desc get single user specific prescription
//@access private staff
//@route get /medicine/prescription/id(userId)

router.get('/prescription',authenticationMiddleware,showPrescription);

//@desc get medicine details
//@access private staff/doctor
//@route get /medicine

router.get('/',authenticationMiddleware,getMedicines);

//@desc adding medicine stocks
//@access private staff
//@route post /medicine

router.post('/',authenticationMiddleware,addMedicine);

export default router;
