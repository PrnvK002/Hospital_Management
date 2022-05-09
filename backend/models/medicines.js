import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    medicineName : {
        type : String,
        required : true
    },
    stock : {
        type : Number,
        required : true
    }
});

const Medicine = mongoose.model('medicines',medicineSchema);

export default Medicine;