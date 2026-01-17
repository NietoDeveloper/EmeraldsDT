import mongoose from "mongoose";
let { ObjectId } = mongoose.Types;

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,

  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
