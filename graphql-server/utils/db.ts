import mongoose from "mongoose";

mongoose.connect("mongodb+srv://cluster0.ins6f.mongodb.net/ims", {
  user: "lowelowing",
  pass: "GOfAaUrMKrotVgqz",
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");
});

export default mongoose;
