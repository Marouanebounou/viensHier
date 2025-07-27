const express = require('express');
const cors = require('cors');
const invitation = require('./routes/invitation');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.use(cors());
app.use('/api',invitation)
app.listen(5000, () => {
    console.log('Server is running on port 5000')
});
