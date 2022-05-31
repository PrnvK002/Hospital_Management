import express from 'express';
import authenticationMiddleware from '../middlewares/authentication.js';
import {getAllChats} from '../controllers/chatController.js';

const router = express.Router();

//@desc getting chats with some other user
//@acess public 
//@path get /chat/:id

router.get('/:id',authenticationMiddleware,getAllChats);

export default router;