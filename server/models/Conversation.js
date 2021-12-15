import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    members: Array,
    name: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
