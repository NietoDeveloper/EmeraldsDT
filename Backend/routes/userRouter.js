import express from "express";
import {
  UserById,
  accpetOrder,
  allUsers,
  updateCart,
  updateUser,
  userLogin,
  userRegister,
} from "../controllers/userController.js";




router.post("/accpetOrder/:userId/:orderId", accpetOrder);

export default router;
