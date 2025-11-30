import Ingredient from "../models/IngredientModel.js";
import { initImageKit } from "../utils/imageKit.js";
import path from "path";
import Item from "../models/ItemModel.js";
const imagekit = initImageKit();

export const createIngredient = async (req, res) => {
  try {
    const file = req.files.IngredientImage;
    const { name, price, item } = req.body;
    const fileName = `falafel-${Date.now()}${path.extname(file.name)}`;

    // Ensure imagekit is properly initialized
    const result = await imagekit.upload({
      file: file.data,
      fileName,
    });

    const newIngredient = {
      name,
      price,
      item,
      IngredientImage: {
        fileId: result.fileId,
        url: result.url,
      },
    };

    const ingredient = new Ingredient(newIngredient);
    await ingredient.save();

    return res.status(201).json({
      success: true,
      message: "Ingredient created successfully",
      ingredient,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

export const readAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    return res.status(200).json({
      success: true,
      message: "All ingredients fetched successfully",
      ingredients,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;

    const ingredient = await Ingredient.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!ingredient) {
      return res.status(404).json({
        success: false,
        message: "Ingredient not found",
      });
    }

    // check if admin want to update image
    if (req.files) {
      const file = req.files.IngredientImage;
      const fileName = `falafel-${Date.now()}${path.extname(file.name)}`;
      const result = await imagekit.upload({
        file: file.data,
        fileName,
      });

      await imagekit.deleteFile(ingredient.IngredientImage.fileId);

      ingredient.IngredientImage = {
        fileId: result.fileId,
        url: result.url,
      };
      await ingredient.save();
    }

    return res.status(200).json({
      success: true,
      message: "Ingredient updated successfully",
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

export const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByIdAndDelete(id);
    if (!ingredient) {
      return res.status(404).json({
        success: false,
        message: "Ingredient not found",
      });
    }
    await imagekit.deleteFile(ingredient.IngredientImage.fileId);
    return res.status(200).json({
      success: true,
      message: "Ingredient deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

export const getIngredientById = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({
        success: false,
        message: "Ingredient not found",
      });
    }
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
