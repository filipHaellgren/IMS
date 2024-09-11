import mongoose from "mongoose";

mongoose.connect(process.env.CONNECTION_STRING as string, {
  user: process.env.USERNAME as string,
  pass: process.env.PASSWORD as string,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");
});

export default mongoose;
