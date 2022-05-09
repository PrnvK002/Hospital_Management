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
  },
  { timestamps: true }
);

const Appointment = mongoose.model('appointments',appointmentSchema);

export default Appointment;