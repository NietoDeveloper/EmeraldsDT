import mongoose from "mongoose";
let { ObjectId } = mongoose.Types;

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Ingredient", ingredientSchema);
