import asyncHandler from "express-async-handler";
import Prescription from "../models/prescription.js";
import Medicine from "../models/medicines.js";
import Appointment from '../models/appointments.js';

//@desc add prescription
//@access private doctor
//@route post /prescription

export const addPrescription = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {medicineData} = req.body;
  const prescription = new Prescription({
    doctor_id: req.user._id,
    user_id: req.body.user_id,
    medicines: medicineData,
  });
  const prescriptionData = await prescription.save();
  let update;
  for(let i in medicineData){
    const { medicineName , frequency , days } = medicineData[i];
    const n = frequency * days;
    update = await Medicine.updateOne(
      { medicineName : medicineName },
      { $inc: { stock: -n } }
    );
  }
  if (update && prescriptionData ) {
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const setUser = await Appointment.updateOne({ user_id : req.body.user_id , doctor_id : req.user._id , date : { $gt : yesterday } },{ $set : { status : 'treated' } });
    if(setUser){
      console.log(setUser);
      res.status(201).json({ prescriptionData });
    }else{
      res.status(204);
      throw new Error('Cannot update appointment');
    }
  } else {
    res.status(500);
    throw new Error("Something went wrong please try after some time");
  }
});


//@desc get single prescription
//@access private staff
//@route post /staff/prescription/id(prescriptionId)

export const showPrescription = asyncHandler(async (req, res) => {
  let { id , date , user_id } = req.query;
  date = date.split('T')[0];
  // const newDate = new Date(date);
  // console.log(newDate);
  const prescription = await Prescription.findOne({ doctor_id: id , user_id : user_id  });
  if (prescription) {
    res.status(200).json({ prescription });
  } else {
    res.status(404);
    throw new Error(
      "Unable to find this Prescription contact the admin or try after some time "
    );
  }
});

//@desc adding medicine stocks
//@access private staff
//@route post /medicine

export const addMedicine = asyncHandler(async (req,res) => {
  const newMedicine = new Medicine({
    medicineName : req.body.medicineName,
    stock : req.body.stock,
    price : req.body.price
  });
  const medicineData = await newMedicine.save(); 

  if(medicineData){
    const data = await Medicine.find({});
    if(data){
      res.status(201).json({ data });
    }else{
      res.status(424);
      throw new Error('Cannot Add medicine data');  
    }
  }else{
    res.status(424);
    throw new Error('Cannot Add medicine data');
  }
});

//@desc get medicine details
//@access private staff/doctor
//@route get /medicine

export const getMedicines = asyncHandler(async (req,res)=>{
  const limit = 10;
  const number = req.query.page;
  const skip = (number-1)*limit;
  const medicineData = await Medicine.find({}).skip(skip).limit(limit);
  if(medicineData){
    res.status(200).json({ medicineData });
  }else{
    res.status(204);
    throw new Error('Cannot find data');
  }
});