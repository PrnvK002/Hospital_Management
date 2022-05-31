import express from 'express';
import { getServices , addServices } from '../controllers/serviceController.js';

const router = express.Router();

//@desc getting service
//@acess public
//@path get /services

router.get('/',getServices);

//@desc adding service
//@acess admin
//@path /services

router.post('/',addServices);

export default router;