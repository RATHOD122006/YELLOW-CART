const express = require('express');
const Food = require('../controllers/foodController');
const multer = require('multer');

const foodRouter = express.Router();



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage }).single('image');


foodRouter.post('/add', upload, Food.addFood);
foodRouter.get('/list', Food.listfood);
foodRouter.post('/remove', Food.removeFood);



module.exports = foodRouter;
