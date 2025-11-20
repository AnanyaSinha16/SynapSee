import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  freeScansLeft: { type: Number, default: 7 }
});

export default mongoose.model("User", userSchema);
