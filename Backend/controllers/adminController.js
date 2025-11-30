import Admin from "../models/AdminModel.js";
import SubAdmin from "../models/subAdmin.js";
import Item from "../models/ItemModel.js";
import Category from "../models/Category.js";
import Product from "../models/ProductModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { initImageKit } from "../utils/imageKit.js";
import path from "path";
import Banner from "../models/AddBanner.js";
import Ingredient from "../models/IngredientModel.js";
const imagekit = initImageKit();

// admin signup

export const adminSignup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    const adminAlreadyExist = await Admin.findOne({ email: email });
    if (adminAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already registered" });
    }
    if (role === "admin") {
      return res
        .status(400)
        .json({ success: false, error: "Admin Already Registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const admin = await Admin.create({
      email: email,
      password: hashedPassword,
      role: role,
    });
    if (!admin) {
      return res
        .status(500)
        .json({ success: false, error: "Error while signing up the admin" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Admin Registered Successfully",
        admin,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
      error,
    });
  }
};

// admin signin

export const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, error: "User is not registered" });
    }
    const matched = await bcrypt.compare(password, admin.password);
    if (!matched) {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect Password" });
    }
    const role = admin.role;
    if (role === "admin") {
      const token = jwt.sign({ _id: admin._id }, "SECRETTOKEN");
      return res.status(200).json({
        success: true,
        message: "Admin Logged In Successfully",
        token: token,
        data: admin,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "You are not authorized to login as an admin",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Something went wrong please try again",
      error,
    });
  }
};


// get admin

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find({});
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      admin,
    });
  } catch (error) {
    console.log(error);
  }
};

// update admin

export const updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, req.body, {
      new: true,
    });
    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Admin updated successfully",
        admin: updatedAdmin,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// subadmin signup

export const subadminSignup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    const subadminAlreadyExist = await SubAdmin.findOne({ email: email });
    if (subadminAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "SubAdmin already registered" });
    }
    if (role === "subadmin") {
      return res
        .status(400)
        .json({ success: false, error: "SubAdmin Already Registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const subadmin = await SubAdmin.create({
      email: email,
      password: hashedPassword,
      role: role,
    });
    if (!subadmin) {
      return res
        .status(500)
        .json({ success: false, error: "Error while signing up the subadmin" });
    } else {
      return res.status(200).json({
        success: true,
        message: "SubAdmin Registered Successfully",
        subadmin,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
      error,
    });
  }
};

// subadmin signin

export const subadminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    const subadmin = await SubAdmin.findOne({ email: email });
    if (!subadmin) {
      return res
        .status(400)
        .json({ success: false, error: "User is not registered" });
    }
    const matched = await bcrypt.compare(password, subadmin.password);
    if (!matched) {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect Password" });
    }
    const role = subadmin.role;
    if (role === "subAdmin") {
      const token = jwt.sign({ _id: subadmin._id }, "SECRETTOKEN");
      return res.status(200).json({
        success: true,
        message: "SubAdmin Logged In Successfully",
        token: token,
        data: subadmin,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "You are not authorized to login as a subadmin",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Something went wrong please try again",
      error,
    });
  }
};

// get subadmin

export const getSubAdmin = async (req, res) => {
  try {
    const subadmin = await SubAdmin.find({});
    if (!subadmin) {
      return res.status(404).json({
        success: false,
        message: "SubAdmin not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "SubAdmin fetched successfully",
      subadmin,
    });
  } catch (error) {
    console.log(error);
  }
};

// update subadmin

export const updateSubAdmin = async (req, res) => {
  try {
    const subAdminId = req.params.subAdminId;
    const updatedSubAdmin = await SubAdmin.findByIdAndUpdate(
      subAdminId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedSubAdmin) {
      return res.status(404).json({
        success: false,
        message: "SubAdmin not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "SubAdmin updated successfully",
        subadmin: updatedSubAdmin,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete subadmin

export const deleteSubAdmin = async (req, res) => {
  try {
    const subAdminId = req.params.subAdminId;
    const subadmin = await SubAdmin.findByIdAndDelete(subAdminId);
    if (!subadmin) {
      return res.status(404).json({
        success: false,
        message: "SubAdmin not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "SubAdmin deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get subadmin

export const getSubAdminById = async (req, res) => {
  try {
    const subAdminId = req.params.id;
    const subadmin = await SubAdmin.findOne({ _id: subAdminId });
    if (!subadmin) {
      return res.status(404).json({
        success: false,
        message: "SubAdmin not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "SubAdmin fetched successfully",
      subadmin,
    });
  } catch (error) {
    console.log(error);
  }
};

// add banner

export const addBanner = async (req, res) => {
  try {
    const file = req.files.banner;
    const { silderName, head, content, btn } = req.body;
    const fileName = `falafel-${Date.now()}${path.extname(file.name)}`;

    // Ensure imagekit is properly initialized
    const result = await imagekit.upload({
      file: file.data,
      fileName,
    });

    // Create a new banner object with ImageKit fileId and URL
    const newBanner = {
      silderName,
      fileId: result.fileId,
      url: result.url,
      head,
      content,
      btn,
    };

    // Add the new banner to the database
    const banner = new Banner({
      banners: newBanner,
    });

    await banner.save();

    return res.status(200).json({
      success: true,
      message: "Banner added successfully",
      banner: newBanner,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

// get banner

export const getBanner = async (req, res) => {
  try {
    const banners = await Banner.find({});
    return res.status(200).json({
      success: true,
      message: "Banners fetched successfully",
      banners,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

// delete banner

export const deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.bannerId;

    const banner = await Banner.findByIdAndDelete(bannerId);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // Delete the banner from ImageKit
    await imagekit.deleteFile(banner.banners.fileId);

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting banner:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting banner",
    });
  }
};

// add item

export const addItem = async (req, res) => {
  try {
    const file = req.files.image;
    const item = new Item(req.body);
    const { name } = req.body;

    if (name) {
      const itemAlreadyExist = await Item.findOne({ name: name });
      if (itemAlreadyExist) {
        return res
          .status(400)
          .json({ success: false, message: "Item already registered" });
      }
      const itemAlreadyExistInCategory = await Category.findOne({
        category: name,
      });
      if (itemAlreadyExistInCategory) {
        return res.status(400).json({
          success: false,
          message: "Item already registered in category",
        });
      }

      const itemAlreadyExistInProdcut = await Product.findOne({ name: name });
      if (itemAlreadyExistInProdcut) {
        return res.status(400).json({
          success: false,
          message: "Item already registered in product",
        });
      }
    }

    const nutrition = [];
    for (let i = 0; req.body[`nutrition[${i}][name]`]; i++) {
      const name = req.body[`nutrition[${i}][name]`];
      const value = parseFloat(req.body[`nutrition[${i}][value]`]);
      if (!isNaN(value)) {
        nutrition.push({ name, value });
      }
    }

    const fileName = `falafel-banner-${Date.now()}${path.extname(file.name)}`;
    const result = await imagekit.upload({
      file: file.data,
      fileName,
    });

    item.image = {
      fileId: result.fileId,
      url: result.url,
    };

    item.nutrition = nutrition;

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Item added successfully",
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

// get item

export const getItem = async (req, res) => {
  try {
    const items = await Item.find({});
    return res.status(200).json({
      success: true,
      message: "Items fetched successfully",
      items,
    });
  } catch (error) {
    console.log(error);
  }
};

// get item by id

export const getItemByItemId = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const item = await Item.findOne({ _id: itemId });
    const ingredients = [];
    for (let i = 0; item.ingredients[i]; i++) {
      const ingredient = await Ingredient.findOne({ _id: item.ingredients[i] });
      ingredients.push(ingredient);
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (item) {
      return res.status(200).json({
        success: true,
        message: "Item fetched successfully",
        item,
        ingredients,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// delete item

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Delete the item from ImageKit
    await imagekit.deleteFile(item.image.fileId);

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// get item category wise

export const getItemByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const items = await Item.find({ category: categoryId });
    return res.status(200).json({
      success: true,
      message: "Items fetched successfully",
      items,
    });
  } catch (error) {
    console.log(error);
  }
};

// update item

export const updateItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
      new: true,
    });

    // check if admin want to update image

    if (req.files) {
      const file = req.files.image;
      const fileName = `falafel-banner-${Date.now()}${path.extname(file.name)}`;

      // Ensure imagekit is properly initialized
      const result = await imagekit.upload({
        file: file.data,
        fileName,
      });

      // Delete the old image from ImageKit
      await imagekit.deleteFile(updatedItem.image.fileId);

      // Update the item in the database
      updatedItem.image = {
        fileId: result.fileId,
        url: result.url,
      };
      await updatedItem.save();
    }

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
``;

// add category

export const addCategory = async (req, res) => {
  try {
    const file = req.files.image;
    const { category, position } = req.body;

    if (category) {
      const itemAlreadyExist = await Item.findOne({ name: category });
      if (itemAlreadyExist) {
        return res.status(400).json({
          success: false,
          message: "Category already registered in Item",
        });
      }
      const itemAlreadyExistInCategory = await Category.findOne({
        category: category,
      });
      if (itemAlreadyExistInCategory) {
        return res.status(400).json({
          success: false,
          message: "Category already registered",
        });
      }

      const itemAlreadyExistInProdcut = await Product.findOne({
        name: category,
      });
      if (itemAlreadyExistInProdcut) {
        return res.status(400).json({
          success: false,
          message: "Category already registered in product",
        });
      }
    }

    const fileName = `falafel-banner-${Date.now()}${path.extname(file.name)}`;

    if (!file || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Ensure imagekit is properly initialized
    const result = await imagekit.upload({
      file: file.data,
      fileName,
    });

    // Add the new banner to the database

    const newCategory = new Category({
      category,
      image: {
        fileId: result.fileId,
        url: result.url,
      },
      position,
    });

    if (!newCategory) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, please try again",
      });
    }

    await newCategory.save();

    return res.status(200).json({
      success: true,
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
  }
};

// get category

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

// get category by id

export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await Category.findOne({
      _id: categoryId,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (category) {
      return res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        category,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// delete category

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Delete the category from ImageKit
    await imagekit.deleteFile(category.image.fileId);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// update category

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
      }
    );

    // check if admin want to update image

    if (req.files) {
      const file = req.files.image;
      const fileName = `falafel-banner-${Date.now()}${path.extname(file.name)}`;

      // Ensure imagekit is properly initialized
      const result = await imagekit.upload({
        file: file.data,
        fileName,
      });

      // Delete the old image from ImageKit
      await imagekit.deleteFile(updatedCategory.image.fileId);

      // Update the item in the database
      updatedCategory.image = {
        fileId: result.fileId,
        url: result.url,
      };
      await updatedCategory.save();
    }

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updateCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
