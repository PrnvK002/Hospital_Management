import asyncHandler from 'express-async-handler';
import Chat from '../models/chat.js';
import Message from '../models/messages.js';

//@desc getting chats with some other user
//@acess public 
//@path get /chat/:id

export const getAllChats = asyncHandler(async ( req,res ) => {
    const {id} = req.params;
    let chats = {};
    if(req.user.role === 'doctor' ){
        chats = await Chat.findOne({ doctor_id : req.user._id , user_id : id });
    }else{
        chats = await Chat.findOne({ doctor_id : id , user_id : req.user._id });
    }
    if(Object.keys(chats).length > 0){
        const messages = await Message.find({conversationId:chats._id}).populate('from');
        if(messages.length > 0){
            res.status(200).json({ messages });
        }else{
            res.status(204);
            throw new Error('Cannot find chats');
        }
    }
    else{
        res.status(204);
        throw new Error('Cannot find chats of this user');
    }
});

