import asyncHandler from "express-async-handler";
import { Department } from "../models/departments.js";

//@desc home page , department data
  //@access public
  //@route get /
  
  export const homePage = asyncHandler(async (req, res) => {
    const departments = await Department.find({}).sort({ rating: -1 });
  
    if (departments) {
      res.status(200).json({ departments });
    } else {
      throw new Error("Cannot find departments");
    }
  });

//@desc for adding department details
//@access admin
//@route post /addDepartments

export const addDepartment = asyncHandler(async (req, res) => {
    console.log(req.body);
    let department = new Department({
      departmentName: req.body.departmentName,
      description: req.body.description,
      image: req.body.image,
    });
  
    let data = await department.save();
    console.log(data);
  
    if (data) {
      res.status(201).json({ data });
    } else {
      throw new Error("Cannot add Department");
    }
  });
  
  //@desc remvoing departments
  //@access private admin
  //@route delete /removeDepartment
  
  export const removeDepartment = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const status = await Department.deleteOne({ _id: id });
    if (status) {
      console.log(status);
      res.status(204).json({  });
    }else{
      console.log(status);
      res.status(500);
      throw new Error("Error occured while removing department");
    }
  });
  