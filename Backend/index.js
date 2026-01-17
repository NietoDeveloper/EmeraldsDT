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

});

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`server is listening at port : ${PORT}`);
  });
});
