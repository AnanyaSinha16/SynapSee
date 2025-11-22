// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not defined in .env");
    await mongoose.connect(uri, {
      // options (mongoose 7+ doesn't need these, but harmless)
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Connected:", mongoose.connection.host);
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
    // don't exit — allow server to start for local dev but useful to exit in production
  }
};

export default connectDB;
