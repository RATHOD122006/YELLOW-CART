// backend/models/foodModel.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  image : {
  image: String,
  category: String
  }
});

// ✅ export the Mongoose model (not the schema)
module.exports = mongoose.model('Food', foodSchema);
