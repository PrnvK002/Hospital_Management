import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    departmentName : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
    }
})


export const Department = mongoose.model('departments',departmentSchema);