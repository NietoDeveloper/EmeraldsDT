import express from "express";
import {
  adminSignin,
  adminSignup,
  addBanner,
  getBanner,
  deleteBanner,
  addItem,
  getItem,
  deleteItem,
  getItemByCategory,
  updateItem,
  addCategory,
  getCategory,
  getItemByItemId,
  deleteCategory,
  getCategoryById,
  updateCategory,
  subadminSignup,
  subadminSignin,
  getSubAdmin,
  updateSubAdmin,
  deleteSubAdmin,
  getAdmin,
  updateAdmin,
  getSubAdminById
} from "../controllers/adminController.js";

const router = express.Router();

// initial route for admin
router.get("/", (req, res) => {
  res.send("Admin Router");
});

// routes of admin for signup and signin
router.post("/adminSignup", adminSignup);
router.post("/adminSignin", adminSignin);
router.get("/getAdmin", getAdmin)
router.post("/updateAdmin/:adminId", updateAdmin);

// routes of sub-admin for signup and signin
router.post("/subAdminSignup", subadminSignup);
router.post("/subAdminSignin", subadminSignin);
router.get("/subAdmin", getSubAdmin);
router.post("/updateSubAdmin/:subAdminId", updateSubAdmin);
router.delete("/deleteSubAdmin/:subAdminId", deleteSubAdmin);
router.get("/getSubAdmin/:id", getSubAdminById)

// routes for banner
router.post("/addBanner", addBanner);
router.get("/getBanner", getBanner);
router.post("/deleteBanner/:bannerId", deleteBanner);

// route for item
router.post("/addItem", addItem);
router.post("/updateItem/:itemId", updateItem);
router.get("/getItem", getItem);
router.post("/deleteItem/:itemId", deleteItem);
router.get("/getItemByCategory/:categoryId", getItemByCategory);
router.get("/getItemById/:itemId", getItemByItemId);

// category route
router.post("/addCategory", addCategory);
router.get("/getCategory", getCategory);
router.get("/getCategoryById/:categoryId", getCategoryById);
router.delete("/deleteCategory/:categoryId", deleteCategory);
router.post("/updateCategory/:categoryId", updateCategory);

export default router;
