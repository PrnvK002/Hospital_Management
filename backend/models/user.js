import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    googleId : {
      type : String
    },
    email: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "address",
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "patient",
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "departments",
    },
    salary: {
      type: Number,
    },
    age : {
      type : Number
    },
    workSift : {
      type : String
    },
    qualification : {
      type : String
    }
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

export const User = mongoose.model('users',userSchema);

