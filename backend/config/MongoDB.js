import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // connect mongodb
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected Successfully: ${connect.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Failed: ${error.message}`);
  }
}

export default connectDB;