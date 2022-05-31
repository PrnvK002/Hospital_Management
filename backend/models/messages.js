import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversationId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'chat'
    },
    message : {
        type : String,
        required : true
    },
    from : {
        type : Schema.Types.ObjectId,
        ref : 'users',
        required : true
    }
},{timestamps : true});

export default mongoose.model('messages',messageSchema);