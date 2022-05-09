import express from "express";
const router = express.Router();
import authentication from "../middlewares/authentication.js";
import {
  addDepartment,
  removeDepartment,
} from "../controllers/departmentController.js";
import {
  getAllUsers,
  addUser,
  blockUser,
  moreUserInfo,
} from "../controllers/userController.js";

//@desc for getting all patients details
//@access admin
//@route get /patients

router.route("/users/:role/:page").get(authentication, getAllUsers);

//@desc more user info
//@access private admin
//@route get /user

router.route("/user/:id").get(authentication, moreUserInfo);

//@desc adding departments
//@access private admin
//@route post /addDepartments

router.post("/addDepartments", authentication, addDepartment);

//@desc remvoing departments
//@access private admin
//@route delete /removeDepartment

router.delete("/removeDepartment/:id", authentication, removeDepartment);

//@desc block user
//@access private admin
//@route patch /blockUser

router.patch("/blockUser", authentication, blockUser);

//@desc add user
//@access private admin
//@route post /addUser

router.post("/addUser", authentication, addUser);

export default router;
