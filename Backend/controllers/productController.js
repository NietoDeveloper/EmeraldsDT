import Product from "../models/ProductModel.js";
import Item from "../models/ItemModel.js";
import Category from "../models/Category.js";
import path from "path";
import { initImageKit } from "../utils/imageKit.js";
const imagekit = initImageKit();

export const createProduct = async (req, res) => {
  try {
    const file = req.files.image;
    const { name, price, stock, description } = req.body;
    const fileName = `falafel-${Date.now()}${path.extname(file.name)}`;



  
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    // check if admin want to update image
    if (req.files) {
      const file = req.files.image;
      const fileName = `falafel-${Date.now()}${path.extname(file.name)}`;
      const result = await imagekit.upload({
        file: file.data,
        fileName,
      });

      await imagekit.deleteFile(updatedProduct.image.fileId);

      updatedProduct.image = {
        fileId: result.fileId,
        url: result.url,
      };
      await updatedProduct.save();
    }

    if (!updatedProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete pruduct with images
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    await imagekit.deleteFile(product.image.fileId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
