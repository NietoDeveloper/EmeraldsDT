import mongoose from "mongoose";
let { ObjectId } = mongoose.Types;

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    IngredientImage: {
      fileId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ingredient", ingredientSchema);
