import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    conversationId: String,
    messages: [
      {
        senderId: String,
        text: { type: String, default: "" },
        files: { type: Object, default: {} },
        sendingTime: { type: Date, default: Date.now },
      },
    ],
    lastestMessage: {
      text: { type: String, default: "" },
      files: { type: Object, default: {} },
      sendingTime: { type: Date, default: null },
      senderId: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
