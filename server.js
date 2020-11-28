const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// connect database
const { connectDB } = require('./config/db');
connectDB();

app.get('/', (req, res) => {
  res.send('SERVER IS ON FIRE!!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
