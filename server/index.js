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
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL] 
    : ["http://localhost:5173"],  
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use('/api', invitation);

app.get("/", (req, res) => {
  res.send("hello world!");
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;