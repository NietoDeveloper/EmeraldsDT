import mongoose from "mongoose";
import Admin from "./AdminModel.js";

const Connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kuldeepkaware77:K2mzg4IrzGedxwzv@cluster0.lsdtocv.mongodb.net/letsfalafel?retryWrites=true&w=majority"
    );
    console.log("MongoDB Connected");
    initial();
  } catch (error) {
    console.log(error, "Error while connecting to database");
  }
};

const initial = async () => {
  const admin = await Admin.findOne({ _id: "65ad4dcb36f285c1f4ed0a49" });
  if (!admin) {
    const createdAdmin = await Admin.create({
      _id: "65ad4dcb36f285c1f4ed0a49",
      email: "admin@gmail.com",
      password: "$2a$10$1yzKXKEmb6j4bnshs7yNvOHcjYreYHsBJbVStNXcjbnIjRjB/A.aO",
      role: "admin",
    });
  } else {
    return console.log("Admin already created");
  }
};
export default Connection;
