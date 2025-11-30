import express from "express";
import {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews
} from "../controllers/newsController.js";

const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("News");
});

// create
Router.post("/createNews", createNews);

// read
Router.get("/readNews", getNews);

// get news by id
Router.get("/getnews/:id", getNewsById);

// update
Router.post("/updateNews/:id", updateNews);

// delete
Router.delete("/deleteNews/:id", deleteNews)

export default Router;
