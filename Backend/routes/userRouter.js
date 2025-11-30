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

const router = express.Router();

router.get("/", (req, res) => {
  res.send("user is ready");
});

router.post("/register", userRegister);
router.post("/login", userLogin);

router.get("/all", allUsers);
router.get("/:id", UserById);

router.post("/update/:id", updateUser);
router.post("/addCart/:id", updateCart);

router.post("/accpetOrder/:userId/:orderId", accpetOrder);

export default router;
