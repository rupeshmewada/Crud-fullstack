import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

import crudController from "./controllers/crud.controller.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config()
// console.log(dotenv.config());

app.use("/", crudController);

// if not getting use another port 
const PORT = process.env.PORT || 3000;

// const port = 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("running port on ", PORT);
  }
});
