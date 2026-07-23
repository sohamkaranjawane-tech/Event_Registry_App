const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signIn(req, res) {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Enter all credentials!",
      });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
      role,
    });
    res.status(201).json({
      message: "User Created !!",
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Enter all credentials!",
      });
    }
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(401).json({
        message: "Enter valid Creadentials",
      });
    }
    const isPassCorrect = await bcrypt.compare(password, userExist.password);
    if (!isPassCorrect) {
      return res.status(401).json({
        message: "Enter valid Creadentials",
      });
    }
    const token = jwt.sign(
      {
        id: userExist._id,
        email: userExist.email,
        role: userExist.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    return res.status(200).json({
      message: "Login Successful!",
      token,
      user: {
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        role: userExist.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function getProfile(req,res){
  try{
    const user = await userModel.findById(req.user.id).populate("registeredEvents");
    if(!user){
      return res.status(404).json({
        message:"User not found"
      })
    }
    res.status(200).json(user);
  }
  catch(err){
    return res.status(500).json({
      message:err.message
    })
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;

    const user = await userModel
      .findById(id)
      .populate("registeredEvents");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function getAllUser(req, res) {
  try {
    const students = await userModel
      .find({ role: "student" })
      .select("-password");

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}



module.exports = { signIn, login , getProfile , getUser , getAllUser };
