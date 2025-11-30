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

    if (name) {
      const itemAlreadyExist = await Item.findOne({ name: name });
      if (itemAlreadyExist) {
        return res.status(400).json({
          success: false,
          message: "Product already registered in Item",
        });
      }
      const itemAlreadyExistInCategory = await Category.findOne({
        category: name,
      });
      if (itemAlreadyExistInCategory) {
        return res.status(400).json({
          success: false,
          message: "Product already registered in category",
        });
      }

      const itemAlreadyExistInProdcut = await Product.findOne({ name: name });
      if (itemAlreadyExistInProdcut) {
        return res.status(400).json({
          success: false,
          message: "Product already registered",
        });
      }
    }

    if (!name || !price || !stock || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // validation for image
    if (!req.files) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await imagekit.upload({
      file: file.data,
      fileName,
    });

    const newProduct = new Product({
      name,
      price,
      stock,
      description,
      image: {
        fileId: result.fileId,
        url: result.url,
      },
    });

    if (!newProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product creation failed" });
    }

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(400).json({ message: "No products found" });
    }

    return res.status(200).json({
      success: true,
      message: "Products found",
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product found",
      product,
    });
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
