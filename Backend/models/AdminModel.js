import mongoose from "mongoose";
let { ObjectId } = mongoose.Types;

const adminSchema = new mongoose.Schema(
  {
    email: String,
    password: String,

    role: {
      type: String,
      default: "admin",
    },
