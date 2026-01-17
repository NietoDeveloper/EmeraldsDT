import express from "express";
const app = express();

import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import credentials from "./middlewares/credentials.js";
import DB from "./models/database.js";
import corsOptions from "./middlewares/corsOption.js";

const PORT = 8080;

DB();

app.use(credentials);

app.use(morgan("tiny"));

xt();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("hitted on root : ", req.headers["user-agent"]);
  res.status(200).json("Hello World!");
});

// ============================ Routes  ======================================


app.use("/api/admin", adminRoutes);
app.use("/api/news", newsRouter);
app.use("/api/product", productRouter);
app.use("/api/ingredient", ingredientRouter);
app.use("/api/user", userRouter);

// ===============================Routes End==================================

app.all("*", (req, res) => {
  res.sendStatus(404);
});

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`server is listening at port : ${PORT}`);
  });
});
