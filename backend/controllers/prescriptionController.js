import asyncHandler from "express-async-handler";
import Prescription from "../models/prescription.js";
import Medicine from "../models/medicines.js";

//@desc add prescription
//@access private doctor
//@route post /prescription

export const addPrescription = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { frequency, days } = req.body;
  const medicine = {
    medicine_id: req.body.medicine,
    frequency: frequency,
    days: days,
  };
  const prescription = new Prescription({
    doctor_id: req.user._id,
    user_id: req.body.user,
    medicines: [medicine],
  });
  const prescriptionData = await prescription.save();

  const n = frequency * days;
  const update = await Medicine.updateOne(
    { _id: req.body.medicine },
    { $inc: { stock: -n } }
  );

  if (insertStatus) {
    res.status(201).json({ prescriptionData });
  } else {
    res.status(500);
    throw new Error("Something went wrong please try after some time");
  }
});

//@desc show prescription
//@access private staff
//@route post /staff/userPrescription/id

export const showUserPrescription = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const prescription = await Prescription.find({ user_id: id });
  if (prescription) {
    res.status(200).json({ prescription });
  } else {
    res.status(404);
    throw new Error("Unable to find Prescription of this user");
  }
});

//@desc get single prescription
//@access private staff
//@route post /staff/prescription/id(prescriptionId)

export const showPrescription = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const prescription = await Prescription.findOne({ _id: id });
  if (prescription) {
    res.status(200).json({ prescription });
  } else {
    res.status(404);
    throw new Error(
      "Unable to find this Prescription contact the admin or try after some time "
    );
  }
});
