import express from 'express';
const router = express.Router();
import authentication from '../middlewares/authentication.js'
import { addDepartment, getAllUsers } from '../controllers/adminControllers.js'

//@desc for getting all patients details
//@access admin
//@route get /patients

router.route('/users/:role/:page').get(authentication,getAllUsers);

//@desc adding departments
//@access private admin
//@route post /addDepartments

router.post('/addDepartments',authentication,addDepartment);


export default router;