const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { badRequest400, serverError500, created201, success200 } = require("../helpers/requestBuilder");

const SECRET_KEY = 'ha34523jiosf123dhfj';
const TOKEN_EXPIRE_TIME = "300s";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      badRequest400(res, `User already exists with email: ${email}`)
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
          expiresIn: TOKEN_EXPIRE_TIME
        });
        created201(res, "SIGNNED UP SUCCESSFULLY", { token })
      }
      else throw ("ERROR")

    }
  } catch (error) {
    console.log(error)
    serverError500(req)
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
        success200(res, "SIGNNED IN SUCCESSFULLY", { token })
      } else {
        badRequest400(res, 'Invalid Credentials')
      }
    } else {
      badRequest400(res, `User not found with email: ${email}`)
    }
  } catch (error) {
    console.log(error)
    serverError500(req)
  }
}

module.exports = { signup, signin }