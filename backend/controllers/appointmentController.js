import asyncHandler from "express-async-handler";
import Appointment from "../models/appointments.js";

//@desc see all appointments
//@access private doctor
//@route get /staff/appointments

export const getAllAppointmetns = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({});

  if (appointments) {
    res.status(200).json({ appointments });
  } else {
    res.status(404);
    throw new Error("Cannot find all appointments");
  }
});

//@desc see all appointments of a doctor
//@access private doctor
//@route get /doctor/appointments

export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({
    doctor_id: req.user._id,
  }).populate("patient_id");
  if (appointments.length > 0) {
    res.status(200).json({ appointments });
  } else {
    res.status(404);
    throw new Error("Appointments not found");
  }
});

//@desc fix an appointment
//@access public
//@route post /appointment

export const fixingAppointment = asyncHandler(async (req, res) => {
  console.log(req.body);
  let data;
  const details = await Appointment.find({
    doctor_id: req.body.doctor_id,
    date: new Date(req.body.date),
  })
    .sort({ date: -1 })
    .limit(1);
    console.log(details);
  if (details[0].token) {
    const token = details[0].token;
    const appointment = new Appointment({
      doctor_id: req.body.doctor_id,
      patient_id: req.user._id,
      token: token + 1,
      paymentDetails: req.body.paymentDetails,
      date: req.body.date,
    });
    data = await appointment.save();
  } else {
    const appointment = new Appointment({
      doctor_id: req.body.doctor_id,
      patient_id: req.user._id,
      token: 1,
      paymentDetails: req.body.paymentDetails,
      date: new Date(req.body.date),
    });
    data = await appointment.save();
  }

  if (data) {
    res.status(200).json({ data });
  } else {
    res.status(500);
    throw new Error("Cannot fix appointment right now try some other time");
  }
});

//@desc get appointment history
//@access public
//@route get /appointmentHistory

export const getAppointmentHistory = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user_id: req.user._id });
  if (appointments) {
    res.status(200).json({ appointments });
  } else {
    res.status(404);
    throw new Error("Cannot get appointment History");
  }
});

//@desc get currently active appointments
//@access public 
//@route get /appointment

export const getActiveBooking = asyncHandler( async (req,res) =>{

  const appointment = await Appointment.find({ status : 'active' });
  if(appointment.length > 0){
    res.status(200).json({ appointment });
  }else{
    res.status(404);
    throw new Error('unable to find appointments');
  }
});