const express = require('express');
const { verifyToken } = require('../middleware/tokenAtuh');
const { UserAuth } = require('../models/AuthUsers');




const usersData = express.Router();

usersData.get("/getAll", verifyToken, async (req, res) => {
  try {
    const user = await UserAuth.find({});
    res.send("Get All Successfully !" + user);
  } catch (error) {
    console.log("Error Something Wrong " + error.code);
  }
});

usersData.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await UserAuth.deleteOne({ _id: id });
    console.log(user);
    res.send("Deleted Successfully ! ");
  } catch (error) {
    console.log("Error Something Wrong " + error.code);
  }
});

usersData.patch("/update", verifyToken, async (req, res) => {
  try {
    const { id, teach, learn, city, gender } = req.body;
    console.log(id);
    const updateUser = {}
    if (req.body.city) updateUser.city = req.body.city;
    if (req.body.gender) updateUser.gender = req.body.gender;
    if (req.body.learn && req.body.learn.length > 0) updateUser.learn = req.body.learn;
    if (req.body.teach && req.body.teach.length > 0) updateUser.teach = req.body.teach;
    const user = await UserAuth.findByIdAndUpdate(
      id,
      updateUser,
      { new: true }
    );
    res.send({
      message: "Updated Successfully !",
      data: user
    });
  } catch (error) {
    res.status(500).send({
      message: "Error Something Wrong",
      error: error.message
    });
    console.log("Error Something Wrong " + error.message);
  }
});


module.exports = {
  usersData
}