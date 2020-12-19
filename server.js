const express = require('express');
const app = express();

// user body parser
app.use(express.json({ extended: false }));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
