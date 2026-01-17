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
