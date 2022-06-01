import mongoose from "mongoose";
import Chat from "./models/chat.js";
import Message from "./models/messages.js";

//=================== Add messages to the database ======================
export function addMessage(message, user, doctor, isDoctor, conversationId) {
  return new Promise(async (resolve, reject) => {
    const from = isDoctor === true ? doctor : user;

    //=============== checking if conversation id exists ===========
    if (conversationId) {
      const addMessage = new Message({
        conversationId: conversationId,
        message: message,
        from: from,
      });
      const status = await addMessage.save();

      if (status) {
        const send = await Message.aggregate([
          { $match: { _id: mongoose.Types.ObjectId(status._id) } },
          { $lookup: { from: 'users', localField: 'from', foreignField: '_id', as: 'from' } },
          { $unwind: "$from" }
        ]);
        if (send) {
          resolve(send);
        } else {
          reject('failed no message');
        }
      } else {
        reject("failed to add message to the database");
      }
    }
    //================= creating new conversation ===================
    else {
      const check = await Chat.findOne({
        user_id: user,
        doctor_id: doctor,
      });
      console.log("checking chat",check);
      if (Object.keys(check).length > 0) {
        const addMessage = new Message({
          conversationId: check._id,
          message: message,
          from: from,
        });

        const msg = await addMessage.save();

        console.log('added message in chat',msg);

        if (msg) {
          const send = await Message.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(msg._id) } },
            { $lookup: { from: 'users', localField: 'from', foreignField: '_id', as: 'from' } },
            { $unwind: "$from" }
          ]);

          console.log("sending message",send);

          if(send){
            resolve(send);
          }else{
            reject('failed to send message');
          }
        } else {
          reject("failed to add message to the database");
        }
      } else {
        const conversation = new Chat({
          user_id: user,
          doctor_id: doctor,
        });

        const status = await conversation.save();
        console.log("new Chat",status);
        if (status) {
          const addMessage = new Message({
            conversationId: status._id,
            message: message,
            from: from,
          });

          const Message = await addMessage.save();

          if (addMessage) {
            const send = await Message.aggregate([
              { $match: { _id: mongoose.Types.ObjectId(status._id) } },
              { $lookup: { from: 'users', localField: 'from', foreignField: '_id', as: 'from' } },
              { $unwind: "$from" }
            ]);
            if (send) {
              resolve(send);
            } else {
              reject('failed no message');
            }
          } else {
            reject("failed to add message to the database");
          }
        } else {
          reject("failed to add message to the database");
        }
      }
    }
  });
}

//======================= checking for new Messengers ==================
export function getNewMessengers(doctor) {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await Chat.aggregate([
        { $match: { doctor_id: mongoose.Types.ObjectId(doctor) } },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user_id",
          },
        },
        { $unwind: "$user_id" },
      ]);
      if (Object.keys(users).length > 0) {
        resolve(users);
      } else {
        reject("no users");
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

//==================== getting user specific messages =================
export function getMessages(conversationId) {
  return new Promise(async (resolve, reject) => {
    const messages = await Message.aggregate([
      { $match: { conversationId: mongoose.Types.ObjectId(conversationId) } },
      { $lookup: { from: 'users', localField: 'from', foreignField: '_id', as: 'from' } },
      { $unwind: "$from" }
    ]);
    
    if (messages.length > 0) {
      resolve(messages);
    } else {
      reject("Cannot find Messages");
    }
  });
}
