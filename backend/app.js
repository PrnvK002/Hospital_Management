import express from "express";
import logger from "morgan";
import bodyParser from 'body-parser';
// import dotenv from "dotenv";
import connectDB from "./config/connection.js";
import { notFound , errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';

//=================== environment variable setup ============================
//put it about routes
// dotenv.config({ path : './.env' });
// console.log(process.env);

//=============== Routes ===========================
import appointmentRoute from './routes/appointmentRoutes.js';
import userRoute from './routes/usersRoutes.js';
import medicineRoute from './routes/medicineRoute.js';
import reportRoute from './routes/reportRoutes.js';
import departmentRoute from './routes/departmentRoutes.js';
import uploadRoute from './routes/uploadRoute.js';
import serviceRoute from './routes/serviceRoutes.js';
import chatRoute from './routes/chatRoute.js';
//================== Mongodb server connection ==============================
connectDB();

const app = express();

//=========== Cors =================
app.use(cors({ origin : "*" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//setting up logger
app.use(logger("dev"));

//====================== Routing to different routes ====================

app.use('/',userRoute);
app.use('/medicine',medicineRoute);
app.use('/department',departmentRoute);
app.use('/report',reportRoute);
app.use('/appointment',appointmentRoute);
app.use('/uploads',uploadRoute);
app.use('/services',serviceRoute);
app.use('/chat',chatRoute);

//====================== Error handling middleware ==========================

app.use(notFound);
app.use(errorHandler); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started running on ${PORT}`));
