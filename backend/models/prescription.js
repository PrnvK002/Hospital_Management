import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    medicine_id : { 
        type : String,
        required : true,
        ref : 'medicines'
     },
     frequency : {
        type : Number,
        required : true
     },
     days : {
         type : Number,
         required : true
     }
});

const prescriptionSchema = new Schema({
    doctor_id : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    },
    user_id : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    },
    medicines : medicineSchema
});

const Prescription = mongoose.model('prescription',prescriptionSchema);

export default Prescription;