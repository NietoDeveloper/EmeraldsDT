import mongoose from "mongoose";
let { ObjectId } = mongoose.Types;

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    nutrition: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
    ingredients:[
      {
        type: ObjectId,
        ref:"Ingredient"
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
