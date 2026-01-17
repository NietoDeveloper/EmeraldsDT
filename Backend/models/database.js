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
("Admin already created");
  }
};
export default Connection;
