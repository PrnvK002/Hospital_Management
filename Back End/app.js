import express from "express";
import logger from "morgan";
import path from "path";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import connectDB from "./config/connection.js";
import { notFound , errorHandler } from './middlewares/errorHandler';

//=============== Routes ===========================
import adminRoutes from './routes/adminRoutes';
import patientRoutes from './routes/patientRoutes';
import staffRoutes from './routes/staffRoutes';
import doctorRoutes from './routes/doctorRoutes';

//=================== environment variable setup ============================
dotenv.config();

//================== Mongodb server connection ==============================
connectDB();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

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
