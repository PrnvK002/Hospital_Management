import express from "express";
const router = express.Router();
import authentication from "../middlewares/authentication.js";
import {
  addDepartment,
  homePage,
  removeDepartment,
} from "../controllers/departmentController.js";

//@desc home page , department data
//@access public
//@route get /

router.get("/", homePage);

//@desc adding departments
//@access private admin
//@route post /addDepartments

router.post("/", authentication, addDepartment);

//@desc remvoing departments
//@access private admin
//@route delete /removeDepartment

router.delete("/:id", authentication, removeDepartment);

export default router;
