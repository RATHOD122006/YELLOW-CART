const express = require('express');
const db = require('./config/db');
const path = require('path');
const foodRouter = require('./routes/foodRoute');
const cors = require('cors');
const { default: userRouter } = require('./routes/userRoute');
const dotenv = require('dotenv');
dotenv.config();



const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); // For application/json
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use('/api/food', foodRouter);

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/user', userRouter);


app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
