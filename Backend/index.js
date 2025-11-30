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

// // express file upload
import fileUpload from "express-fileupload";
app.use(fileUpload());

app.use(cors(corsOptions));
// Allow all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("hitted on root : ", req.headers["user-agent"]);
  res.status(200).json("Hello World!");
});

// ============================ Routes  ======================================

import adminRoutes from "./routes/adminRouter.js";
import newsRouter from "./routes/newsRouter.js";
import productRouter from "./routes/productRouter.js";
import ingredientRouter from "./routes/ingredientRouter.js";
import userRouter from "./routes/userRouter.js";

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
