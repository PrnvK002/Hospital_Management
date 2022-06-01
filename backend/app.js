import express from "express";
import logger from "morgan";
import bodyParser from 'body-parser';
import path from 'path';
// import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/connection.js";
import { notFound , errorHandler } from './middlewares/errorHandler.js';
import { NODE_ENV } from './config/global.js';

//=================== environment variable setup ============================
//put it abouve routes
// dotenv.config({ path : './.env' });

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

const __dirname = path.resolve()
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  )
} else {
    console.log(NODE_ENV);
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

//====================== Error handling middleware ==========================

app.use(notFound);
app.use(errorHandler); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started running on ${PORT}`));
