const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = 'ha34523jiosf123dhfj';
const errorMessage = "SOMETHING WENT WRONG"

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: `User already exists with email: ${email}`,
      })
    } else {
      const hashedPassword = await bcrypt.hash(password, 7);
      const newUser = new userModel({
        username: username || 'User',
        email: email,
        password: hashedPassword,
      });
      const result = await newUser.save();
      if (result) {
        const token = jwt.sign({ email: newUser.email, id: newUser.id }, SECRET_KEY, {
          expiresIn:"300s"
        });
        res.status(201).json({ token })
      }
      else throw ("ERROR")

    }
  } catch (error) {
    console.log("SIGNUP IN ERROR", error)
    res.status(500).json({ message: errorMessage })
  }
}

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const passwordMatched = await bcrypt.compare(password, existingUser.password);
      if (passwordMatched) {
        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY);
        res.status(201).json({ token })
      } else {
        res.status(400).json({
          message: "Invalid Credentials",
        })
      }
    } else {
      res.status(400).json({
        message: `User not found with email: ${email}`,
      })
    }
  } catch (error) {
    console.log("SIGNIN IN ERROR")
    res.status(500).json({ message: errorMessage })
  }
}

module.exports = { signup, signin }