import express from "express";
// import mongoose from "mongoose";

import crudModel from "../model/connection.js";
const router = express.Router();

const app = express();

router.get("/", async (req, res) => {
  try {
    let allUsers = await crudModel.find({});
    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(404).json({ message: "No data found" });
    }

  } catch (error) {
    return res.status(500).json({ message:  error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let user = req.body;
    const allUsers = await crudModel.find({});

    if (user != 0) {
      if (allUsers != 0) {
        let last = allUsers[allUsers.length - 1].id;
        const data = await crudModel.create({ ...user, id: last + 1 });
        // console.log(data);
      } else {
        const data = await crudModel.create({ ...user, id: 1 });
        // console.log(data);
      }
      return res.status(201).json({ message: "data created successfully" });
    } else {
      return res.status(404).json({ message: "user data not found" });
    }

  } catch (err) {
    // console.log(err);
    return res.status(500).json({ message: "Error in deleting data" });
  }
});

router.delete("/:id", async (req, res) => {
  // const data = await crudModel.findOne({ id: req.params.id });
  const del = await crudModel.deleteOne({ id: req.params.id });
  if (del.deletedCount > 0) {
    console.log("User deleted successfully");
    return res.json({ message: "User deleted successfully" });
  } else {
    console.log("No user found with this id");
    return res.json({ message: "No user found with this id" });
  }
});

router.patch("/updateuser/:id", async (req, res) => {
  // console.log(); 
  let param = req.params.id;
  let bod = req.body;
  const user = await crudModel.findOne({ id: param });
  const up = await crudModel.updateOne({ id: param }, { $set: bod });
  // console.log(user);

  res.json(up);
});

export default router;
