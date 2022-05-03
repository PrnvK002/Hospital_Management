import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    departmentName : {
        type : "String",
        required : true
    },
    doctors : {
        type : "Number"
    }
    ,
    rating : {
        type : "Number",
    }
})


export const Department = mongoose.model('departments',departmentSchema);