import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
// ================= Models ===============
import { User } from "../models/user.js";
//=================== Validator ============
import { loginSchema, signupSchema } from "../validation/validation.js";
import sendSms from "../middlewares/sms.js";
import generateToken from "../util/generateToken.js";

//@desc login check
//@route POST /login
//@access public

export const authLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const result = await loginSchema.validateAsync(req.body);

    let user = await User.findOne({ email: email });

    if (!user) {
      console.log(user);
      res.status(401);
      throw new Error("Invalid email address");
    }

    if (user.isBlocked) {
      res.status(403);
      throw new Error("Account is blocked");
    }

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        username: user.user_name,
        role: user.role,
        age: user.age,
        phone: user.phone,
        gender: user.gender,
        authToken: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or password");
    }

  } catch (err) {
    res.status(422);
    throw new Error('Please check your credentials');
  }
});

//@desc signup
//@route POST /signup
//@access public

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const result = await signupSchema.validateAsync(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400);
      throw new Error(`${req.body.email} is already in use `);
    }
    let ecrypted = await bcrypt.hash(req.body.password, 10);
    let status = await User.create({
      user_name: req.body.username,
      email: req.body.email,
      password: ecrypted,
      gender: req.body.gender,
      phone: req.body.phone,
      age: req.body.age,
    });

    if (status) {
      res.status(201).json({});
    } else {
      res.status(400);
      throw new Error("Error occured while creating the user");
    }
  } catch (err) {
    console.log(err);
    res.status(422);
    throw new Error('Please check the credentials you have entered');
  }
});

//@desc route for google register 
//@access public
//@route post /google/register

export const googleRegister = asyncHandler(async (req, res) => {
  console.log(req.body);
  const userAlreadyExist = await User.findOne({ email: req.body.email });
  if (userAlreadyExist) {
    res.status(400);
    throw new Error(`${req.body.email} is already registered`);
  }
  const encryptPassword = await bcrypt.hash(req.body.password, 10);
  const username = req.body.givenName + req.body.familyName;
  const createUser = await User.create({
    googleId: req.body.googleId,
    user_name: username,
    email: req.body.email,
    password: encryptPassword,
    gender: req.body.gender,
    phone: req.body.phone,
    age: req.body.age,
  });

  if (createUser) {
    res.status(201).json({});
  }
  else {
    res.status(400);
    throw new Error("Error occured while creating the user");
  }
});

//@desc route for google login permision
//@access public
//@route post /google/auth


export const googleAuthentication = asyncHandler(async (req, res) => {
  const { googleId } = req.body;
  const user = await User.findOne({ googleId: googleId });
  if (user) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.user_name,
      role: user.role,
      age: user.age,
      phone: user.phone,
      gender: user.gender,
      authToken: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('User not registerd');
  }
})

//@desc otp verification
//@route POST /sendOtp
//@access public

export const sendOtp = async (req, res) => {
  let { phone } = req.body;
  console.log(phone);

  // let user = await User.find({ phone: phone });

  // if (!user) {
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  console.log(otp);
  sendSms(phone, otp);
  res.json({ otp: otp });

  // res.status(401);
  // throw new Error("User already exist with the same phone");
};

//@desc department specific doctors
//@access public
//@route get /getDoctors/:department Id

export const getDoctors = asyncHandler(async (req, res) => {
  const departmentId = req.params.id;
  const doctors = await User.find({ department: departmentId, role: 'doctor' });
  if (doctors) {
    res.status(200).json({ doctors });
  } else {
    res.status(404);
    throw new Error("No doctors found for this department");
  }
});

//@desc for getting all users details
//@access admin
//@route get /patients

export const getAllUsers = asyncHandler(async (req, res) => {
  const pageLimit = 10;
  let pageNo = req.params.page;
  let role = req.params.role;
  let skip = (pageNo - 1) * 10;

  try {
    let user = await User.find({ role: role }, { password: 0 })
      .populate("department", "departmentName")
      .skip(skip)
      .limit(pageLimit);

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Unable find any users");
  }
});

//@desc more user info
//@access private admin
//@route get /moreInfo

export const moreUserInfo = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }, { password: 0 }).populate('department', 'departmentName');
    if (user) {
      res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Cannot find the user");
  }
});

//@desc block user
//@access private admin
//@route patch /blockUser

export const blockUser = asyncHandler(async (req, res) => {
  let { id, status } = req.body;
  let update;
  if (status) {
    update = await User.updateOne({ _id: id }, { isBlocked: "false" });
  } else {
    update = await User.updateOne({ _id: id }, { isBlocked: "true" });
  }
  if (update) {
    res.status(200).json({ message: "Successfully update User" });
  } else {
    res.status(500);
    throw new Error("Error occured while blocking the user");
  }
});

//@desc add user
//@access private admin
//@route post /addUser

export const addUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const ecrypted = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    user_name: req.body.username,
    password: ecrypted,
    gender: req.body.gender,
    phone: req.body.phone,
    age: Number(req.body.age),
    role: req.body.role,
    salary: Number(req.body.salary),
    department: req.body.department,
    qualification: req.body.qualification,
    workShift: req.body.workShift
  });

  const status = await user.save();

  if (status) {
    res.status(201).json({ status });
  } else {
    console.log(status);
    res.status(500);
    throw new Error("Some sort of error occured while adding user");
  }
});

//@desc edit profile
//@access public
//@route put /profile

export const editProfile = asyncHandler(async (req, res) => {

  console.log(req.body);
  const update = await User.updateOne({ _id: req.user._id },
    {
      $set: {
        email: req.body.email,
        user_name: req.body.username,
        phone: req.body.phone,
        age: req.body.age,
      }
    });
  if (update) {
    const user = await User.findOne({ _id: req.user._id });
    if (user) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        username: user.user_name,
        role: user.role,
        age: user.age,
        phone: user.phone,
        gender: user.gender,
        authToken: generateToken(user._id)
      });
    } else {
      res.status(500);
      throw new Error('updation failed')
    }
  } else {
    res.status(500);
    throw new Error('updation failed')
  }

});