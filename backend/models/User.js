// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profileUrl: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
