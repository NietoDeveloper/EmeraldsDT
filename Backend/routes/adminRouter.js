import express from "express";
import {
  adminSignin,
  adminSignup,
  addBanner,
  getBanner,
  deleteBanner,
  addItem,
  getItem,

} from "../controllers/adminController.js";

const router = express.Router();

// initial route for admin
router.get("/", (req, res) => {
  res.send("Admin Router");
});


// routes for banner
router.post("/addBanner", addBanner);
router.get("/getBanner", getBanner);
router.post("/deleteBanner/:bannerId", deleteBanner);


// category route
router.post("/addCategory", addCategory);
router.get("/getCategory", getCategory);
router.get("/getCategoryById/:categoryId", getCategoryById);
router.delete("/deleteCategory/:categoryId", deleteCategory);
router.post("/updateCategory/:categoryId", updateCategory);

export default router;
