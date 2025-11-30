import News from "../models/NewsModel.js";
import { initImageKit } from "../utils/imageKit.js";
import path from "path";
const imagekit = initImageKit();

export const createNews = async (req, res) => {
  try {
    const file = req.files.image;
    const { title, description, featured } = req.body;
    const fileName = `falafel-news-${Date.now()}${path.extname(file.name)}`;

    // Ensure imagekit is properly initialized
    const result = await imagekit.upload({
      file: file.data,
      fileName,
    });

    const news = await News.create({
      title,
      description,
      featured,
      image: {
        fileId: result.fileId,
        url: result.url,
      },
    });
    res.status(201).json({
      success: true,
      message: "News created successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // check if admin want to update image

    if (req.files) {
      const file = req.files.image;
      const fileName = `falafel-news-${Date.now()}${path.extname(file.name)}`;

      // Ensure imagekit is properly initialized
      const result = await imagekit.upload({
        file: file.data,
        fileName,
      });

      // Delete the old image from ImageKit
      await imagekit.deleteFile(news.image.fileId);

      news.image = {
        fileId: result.fileId,
        url: result.url,
      };
      await news.save();
    }

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    // Delete the category from ImageKit
    await imagekit.deleteFile(news.image.fileId);

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
