import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  username: String,
  userInfo: {
    avatar: {
      type: String,
      default: "https://lh3.googleusercontent.com/d/1YjsnvDeH0jbVa3_xRNuZLM44zDiSm-EN",
    },
    avatarId: { type: String, default: "" },
    about: { type: String, default: "" },
    fullName: { type: String, default: "" },
    phone: { type: String, default: "Not provided" },
    location: { type: String, default: "Not provided" },
    website: { type: String, default: "Not provided" },
  },
  friends: Array,
  friendRequests: Array,
  friendRequestsSent: Array,
});

UserSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", UserSchema);
