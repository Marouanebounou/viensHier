const express = require('express');
const cors = require('cors');
const invitation = require('./routes/invitation');

const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/dbConnection');


const app = express();

app.use(express.json());
connectDB();
const corsOptions = {
  origin: ["http://localhost:5173"],   
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use('/api',invitation)
app.get("/", (req, res) => {
  res.send("hello world!");
});
app.listen(5000, () => {
    console.log('Server is running on port 5000')
});

module.exports = app;