import express from "express";
import {
  createNews,
  getNews,
  getNewsById,
  updateNews,

Router.post("/updateNews/:id", updateNews);

// delete
Router.delete("/deleteNews/:id", deleteNews)

export default Router;
