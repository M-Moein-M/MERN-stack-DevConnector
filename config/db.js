const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('Database connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = { connectDB };
