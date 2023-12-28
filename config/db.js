const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URL || 'mongodb+srv://nadarnetwork:Mumbai%402050@nadarnetwork.bw3emob.mongodb.net/nadarnetwork';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB".green);
  } catch (error) {
    console.error(`Error in DB: ${error.message}`.bgGreen.red);
  }
};

module.exports = connectDB;
