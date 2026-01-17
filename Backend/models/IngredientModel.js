import mongoose from "mongoose";
let { ObjectId } = mongoose.Types;


export default mongoose.model("Ingredient", ingredientSchema);
