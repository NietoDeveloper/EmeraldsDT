import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }





export const userLogin = async (req, res) => {
  try {

  } catch (error) {
   
   
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const UserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { orders } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { orders: orders },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    await updatedUser.save();

    return res.status(200).json({
      success: true,
      message: "User cart updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};

export const accpetOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orderId = req.params.orderId;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const order = user.orders.find((order) => order._id == orderId);
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }

    order.status = "Accepted";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Order accepted successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};
