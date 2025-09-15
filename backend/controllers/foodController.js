const Food = require('../models/foodModel');  // <-- must be Mongoose model
const fs = require('fs');
const foodModel = require('../models/foodModel');


module.exports.addFood = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    const addfood = await Food.create({
      ...req.body,
      image: req.file.filename
    });

    res.status(201).json({ success: true, data: addfood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

const listfood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching food items" });
  }
};


const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing food item" });
  }
};

exports.listfood = listfood;
exports.removeFood = removeFood;

