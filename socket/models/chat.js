import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    }
  },
  { timestamps: true }
);

export default mongoose.model('chats',chatSchema);