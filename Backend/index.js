import express from "express";
const app = express();

import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import credentials from "./middlewares/credentials.js";
import DB from "./models/database.js";
import corsOptions from "./middlewares/corsOption.js";

const PORT = 8080;

