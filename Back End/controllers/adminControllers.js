import asyncHandler from "express-async-handler";

import { User } from "../models/user.js";


//@desc for getting all patients details
//@access admin
//@route get /patients

export const getAllUsers = asyncHandler(async (req,res)=>{

    const pageLimit = 10;
    let pageNo = req.params.page;
    let role = req.params.role;
    let skip = (pageNo - 1)*10;

    try{
        let user = await User.find({ role : role }).skip(skip).limit(pageLimit);
        res.status(200).json({ userData : user }); 
    }catch(err){

        console.log(err);
        res.status(404);
        throw new Error('Unable find any users')

    }

})