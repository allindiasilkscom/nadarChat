const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");

const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is Required",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is Required",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is Required and 6 charaecter long",
      });
    }

    const exisitingUser = await userModel.findOne({ email: email });
    if (exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Register With this Email",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Registeration Successfull Please Login",
    });
  } catch (error) {
   
    return res.status(500).send({
      success: false,
      message: "Register API Issue",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "please provide Email Or password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not Found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;

    return res.status(200).send({
      success: true,
      message: "login Succfully",
      token,
      user,
    });
  } catch (error) {
    
    return res.status(500).send({
      success: false,
      message: "Error in Login message",
      error,
    });
  }
};

const updateUsercontroller = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const user = await userModel.findOne({ email });

    if (password && password.length < 6) {
      res.status(400).send({
        success: false,
        message: "Password is Required",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated Please Login",
    });
  } catch (error) {
   
    res.status(500).send({
      success: false,
      message: "Error In User Update Api",
    });
  }
};

module.exports = { registerController, loginController, updateUsercontroller ,requireSignIn};
