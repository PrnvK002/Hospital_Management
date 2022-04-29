import express from 'express';
const router = express.Router();
import authentication from '../middlewares/authentication.js'
import { getAllUsers } from '../controllers/adminControllers.js'

//@desc for getting all patients details
//@access admin
//@route get /patients

router.route('/users/:role/:page').get(authentication,getAllUsers);


export default router;