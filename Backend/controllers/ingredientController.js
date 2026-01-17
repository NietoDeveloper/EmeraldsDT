import Ingredient from "../models/IngredientModel.js";
import { initImageKit } from "../utils/imageKit.js";
import path from "path";
import Item from "../models/ItemModel.js";
const imagekit = initImageKit();


    return res.status(200).json({
      success: true,
      message: "Ingredient fetched successfully",
      ingredient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};
