import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../util/generateToken.js";
// Models
import { User } from "../models/user.js";

//========= Validator ==========
import {
  loginSchema,
  signupSchema,
} from "../validation/validation.js";

//@desc login check
//@route POST /login
//@access public

export const authLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginSchema.validateAsync(req.body);

    let user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("Invalid email address");
    }

    if (user.isBlocked) {
      res.status(403);
      throw new Error("Account is blocked");
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        username: user.user_name,
        role: user.role,
        phone: user.phone,
        gender: user.gender,
        authToken: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or password");
    }
  } catch (err) {
    console.log(err);
    res.status(401);
    throw new Error("Invalid Email or password");
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
      res.status(201).json({ message: " User successfully created " });
    } else {
      res.status(400);
      throw new Error("Error occured while creating the user");
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error("Failed to validate");
  }
});


