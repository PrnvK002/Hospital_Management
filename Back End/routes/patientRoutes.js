import express from 'express';
const router = express.Router();
import authentication from '../middlewares/authentication.js'
import { authLogin , registerUser } from '../controllers/patientControllers.js';


//@desc route for login permision
//@access public

router.post('/login',authLogin);

//@desc route for login permision
//@access public

router.post('/signup',registerUser);

export default router;