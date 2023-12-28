const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 13,
      required: [true, "Please Add the Password"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('User',userSchema);
