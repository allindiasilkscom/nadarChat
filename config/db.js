const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    
  } catch (error) {
    console.log(`error in DB ${error}`.america.bgGreen);
  }
};


module.exports = connectDB