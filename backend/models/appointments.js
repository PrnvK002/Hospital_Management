import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    token: {
      type: Number,
      required: true,
    },
    paymentDetails : {
      type : Object,
      required : true
    },
    date : {
      type : Date,
      required : true
    },
    status : {
      type : String,
      default : 'active'
    }
  },
  { timestamps: true }
);

const Appointment = mongoose.model('appointments',appointmentSchema);

export default Appointment;