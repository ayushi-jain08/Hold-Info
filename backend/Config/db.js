import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000, // Default is 30000 (30 seconds)
      socketTimeoutMS: 45000,
    });
    console.log(`mongodb connect successfully`);
  } catch (error) {
    console.log(`error in mongodb ${error}`);
  }
};

export default connectDB;
