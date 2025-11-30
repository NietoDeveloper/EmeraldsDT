import express from "express";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductById
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Product Router");
});

// create
router.post("/createProduct", createProduct);

// read
router.get("/getProducts", getProduct);

// read single product
router.get("/getProduct/:id", getProductById);

// update
router.post("/updateProduct/:id", updateProduct);

// delete
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
