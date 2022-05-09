import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    user_id : { 
        type : Schema.Types.ObjectId,
        required : true
    },
    testType : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    }
});

const Report = mongoose.model('reports',reportSchema);

export default Report;