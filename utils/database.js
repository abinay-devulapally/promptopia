import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", false);
  if (isConnected) {
    console.log("Using existing connection");
    return;
  }
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to DB");
  } catch (error) {
    if (
      error instanceof mongoose.Error &&
      error.name === "MongoServerError" &&
      error.code === 18
    ) {
      console.error(
        "Authentication failed. Please check your MongoDB credentials."
      );
    } else {
      console.error("Error connecting DB", error);
    }
  }
};
