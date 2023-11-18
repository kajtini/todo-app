import mongoose from "mongoose";

let isConnected: boolean;

const dbConnect = async () => {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error(
      "💥ERROR: You have to provide the mongodb uri in the .env.local file!"
    );
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log("Connected to database");
  } catch (err) {
    console.error(err);
  }
};

export default dbConnect;
