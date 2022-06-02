import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import connectDB from "./conection.js";
import { addMessage , getNewMessengers , getMessages } from "./chatBackup.js";

//============= establishing database connection ========
connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*",
  }
});

//========== Setting global object to know which users are online and chat =========

const users = {};

app.use('/',(req,res)=>{
  res.send("its working")
});

io.on("connect", (socket) => {
  
  //================ handling functions =======================
    //==============handling initial connection =============
    const handleInit = (data)=>{
      data = JSON.parse(data);
      console.log(data);
      users[data.userId] = socket.id;
      console.log(users);
    }
    //============== handle message ===================
    const handleMessage = (data)=>{
      data = JSON.parse(data);
      console.log(data);
      const { message, user, doctor, isDoctor , conversationId } = data;
      addMessage(message, user, doctor,isDoctor,conversationId).then((response)=>{
        if( users[doctor] && isDoctor === false ){
            console.log("resolved data in then",response);
            socket.broadcast.to(users[doctor]).emit('recieveMessage',JSON.stringify({ response}));
          }
          if(users[user] && isDoctor === true ){
            socket.broadcast.to(users[user]).emit('recieveMessage',JSON.stringify({ response }));
          }
        
      })
        .catch((err)=>{
          console.log(err);
  
      })
    }
  
    //================= handling new Messengers =================
    const handleNewMessengers = (data) =>{
      data = JSON.parse(data);
      const {id} = data;
      getNewMessengers(id).then((response) =>{
        socket.emit('messengers',JSON.stringify({conversationData : response}));
      }).catch((err) => {
        console.log(err);
      })
    }

    //================ get chat of users ================
    const handleGetChat = (id) => {
      id = JSON.parse(id);
      getMessages(id.id).then((response) => {
        socket.emit('chatResponse',JSON.stringify(response));
      }).catch((err) => {
        console.log(err);
      })
    }
  
    //====================== handling disconnection ============
    const handleDisconnect = () => {
      delete users[socket._id];
    };



//======== socket event listeners =========================
  socket.on("init", handleInit);
  socket.on('message',handleMessage);
  socket.on('newMessengers',handleNewMessengers);
  socket.on('getChat',handleGetChat);
  socket.on("disconnect", handleDisconnect);
});





server.listen(4000);
