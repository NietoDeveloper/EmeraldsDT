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

router.post("/create", createIngredient);

router.get("/read/all", readAllIngredients);

router.post("/update/:id", updateIngredient);

router.delete("/delete/:id", deleteIngredient);

router.get("/getById/:id", getIngredientById);

export default router;
