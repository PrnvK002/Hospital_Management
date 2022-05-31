import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    medicineName: {
        type: String,
        required: true,
    },
    frequency: {
        type: Number,
        required: true
    },
    days: {
        type: Number,
        required: true
    }
});

const prescriptionSchema = new Schema({
    doctor_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    medicines: [medicineSchema]
}, { timestamps: true });

const Prescription = mongoose.model('prescription', prescriptionSchema);

export default Prescription;