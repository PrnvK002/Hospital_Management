import express from 'express';
import authenticationMiddleware from '../middlewares/authentication.js';
import { addReport, getMedicalReport } from '../controllers/reportController.js';
import router from './departmentRoutes.js';

//@desc get medical reports of a user
//@access private doctor
//@route get /reports/:id(user_id)

router.get('/:id',authenticationMiddleware,getMedicalReport);


//@desc add report
//@access private staff
//@route post /report

router.post('/report',authenticationMiddleware,addReport);


export default router;
