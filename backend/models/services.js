import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceName : {
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
    }
});

export default mongoose.model('service',serviceSchema);