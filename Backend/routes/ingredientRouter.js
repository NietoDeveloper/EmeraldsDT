import express from "express";
import {
  createIngredient,
  deleteIngredient,
  getIngredientById,
  readAllIngredients,
  updateIngredient,
} from "../controllers/ingredientController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Ingredient Router");
});


export default router;
