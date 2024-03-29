import asyncHandler from "express-async-handler";
import Appointment from "../models/appointments.js";

//@desc see all appointments of a doctor
//@access private doctor
//@route get /appointments

export const getAppointments = asyncHandler(async (req, res) => {

  console.log(req);
  console.log(req.params);
  const page = req.query.page;
  const role = req.query.role;
  const state = req.query.state;
  console.log(page , role,state,"queries" );
  const skip = (page - 1) * 10;
  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

  if (role === "doctor") {
    const appointments = await Appointment.find({
      doctor_id: req.user._id,
      status : state,
      date: { $gt: yesterday },
    })
      .populate("patient_id")
      .sort({ token : 1})
      .skip(skip)
      .limit(10);
    if (appointments.length > 0) {
      res.status(200).json({ appointments });
    } else {
      res.status(204);
      throw new Error("No appointments available");
    }
  } else {
    console.log(state);
    const appointments = await Appointment.find({
      status: state, 
      date: { $gt: yesterday },
    })
      .populate("doctor_id")
      .populate("patient_id")
      .sort({ token : 1})
      .skip(skip)
      .limit(10);
    
    if (appointments.length > 0) {
      res.status(200).json({ appointments });
    } else {
      res.status(204);
      throw new Error("Cannot find all appointments");
    }
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
  if (details.length > 0) {
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
  const page = req.params.page;
  const skip = (page - 1) * 10;
  const appointments = await Appointment.find({ user_id: req.user._id })
    .populate("doctor_id", "user_name workShift")
    .sort({ date : -1})
    .skip(skip)
    .limit(10);
  if (appointments) {
    res.status(200).json({ appointments });
  } else {
    res.status(204);
    throw new Error("Cannot get appointment History");
  }
});

//@desc get currently active appointments
//@access public
//@route get /appointment

export const getActiveBooking = asyncHandler(async (req, res) => {
  const {status} = req.params;
  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const appointment = await Appointment.find({
    user_id: req.user._id,
    status: status,
    date: { $gt:yesterday },
  }).populate("doctor_id", "user_name workShift");
  if (appointment.length > 0) {
    console.log(appointment);
    res.status(200).json({ appointment });
  } else {
    console.log(appointment);
    res.status(204);
    throw new Error("unable to find appointments");
  }
});

//@desc cancel appointment
//@access public
//@route patch /appointment/cancel

export const cancelAppointment = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const cancel = await Appointment.updateOne(
    { _id: id },
    { $set: { status: "cancelled" } }
  );
  if (cancel.acknowledged) {
    res.status(200).json({});
  } else {
    res.status(500);
    throw new Error("Failed to cancel the appointment");
  }
});
