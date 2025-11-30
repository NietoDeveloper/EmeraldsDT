import mongoose from "mongoose";
let { ObjectId } = mongoose.Types;

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    image: {
      fileId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    position: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
