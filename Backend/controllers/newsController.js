import News from "../models/NewsModel.js";
import { initImageKit } from "../utils/imageKit.js";
import path from "path";
const imagekit = initImageKit();


    if (req.files) {
      const file = req.files.image;
      const fileName = `falafel-news-${Date.now()}${path.extname(file.name)}`;

  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
