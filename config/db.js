const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB".green); // Assuming 'green' is a colors.js method
  } catch (error) {
    console.error(`Error in DB: ${error.message}`.bgGreen.red); // Formatting the error message
  }
};

module.exports = connectDB;
