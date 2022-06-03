import express from "express";
const router = express.Router();
import authentication from "../middlewares/authentication.js";
import {
  getAllUsers,
  addUser,
  blockUser,
  moreUserInfo,
  authLogin,
  registerUser,
  sendOtp,
  getDoctors,
  editProfile,
  googleAuthentication,
  googleRegister
} from "../controllers/userController.js";
import authenticationMiddleware from "../middlewares/authentication.js";

//@desc route for login permision
//@access public

router.post("/login", authLogin);

//@desc route for login permision
//@access public

router.post("/signup", registerUser);

//@desc route for sending otp
//@access public

router.post("/sendOtp", sendOtp);

//@desc route for google login permision
//@access public

router.post('/google/auth',googleAuthentication);

//@desc route for google register
//@access public

router.post('/google/register',googleRegister)

//@desc department specific doctors
//@access public
//@route get /getDoctors/:department Id

router.get("/getDoctors/:id", authenticationMiddleware, getDoctors);


//@desc for getting all patients details
//@access admin
//@route get /users

router.route("/users/:role/:page").get(authenticationMiddleware, getAllUsers);

//@desc more user info
//@access private admin,doctor
//@route get /user/:id

router.route("/user/:id").get(authenticationMiddleware, moreUserInfo);

//@desc block user
//@access private admin
//@route patch /blockUser

router.patch("/blockUser", authenticationMiddleware, blockUser);

//@desc add user
//@access private admin
//@route post /addUser

router.post("/user", authenticationMiddleware, addUser);

//@desc edit profile
//@access public
//@route put /profile

router.put("/profile",authenticationMiddleware,editProfile);

export default router;
