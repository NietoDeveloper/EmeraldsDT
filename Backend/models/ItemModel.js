import mongoose from "mongoose";
let { ObjectId } = mongoose.Types;

const itemSchema = new mongoose.Schema(

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
