const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// connect database
const { connectDB } = require('./config/db');
connectDB();

app.get('/', (req, res) => {
  res.send('SERVER IS ON FIRE!!');
});

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
