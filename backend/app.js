import express from "express";
import logger from "morgan";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import connectDB from "./config/connection.js";
import { notFound , errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';

//=============== Routes ===========================
import adminRoutes from './routes/adminRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';

//=================== environment variable setup ============================
dotenv.config({ path : '.env' });

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

app.use('/',patientRoutes);
app.use('/admin',adminRoutes);
app.use('/staff',staffRoutes);
app.use('/doctor',doctorRoutes);


//====================== Error handling middleware ==========================

app.use(notFound);
app.use(errorHandler); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started running on ${PORT}`));