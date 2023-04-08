const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { badRequest400, serverError500, created201, success200 } = require("../helpers/requestBuilder");
const validator = require('validator');
const { EMAIL_TAKEN, SIGNUP, LOGIN, INVALID_EMAIL_FORMAT, INVALID_CREDENTIALS, EMAIL_NOT_FOUND } = require("../message/userMessage");
const { UNKNOWN_ERROR } = require("../message/common");

const SECRET_KEY = 'ha34523jiosf123dhfj';
const TOKEN_EXPIRE_TIME = "300s";
const HASH_SALT = 7;

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (validator.isEmail(email)) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        badRequest400(res, EMAIL_TAKEN)
      } else {
        const hashedPassword = await bcrypt.hash(password, HASH_SALT);
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
          created201(res, SIGNUP, { token })
        }
        else {
          badRequest400(res, UNKNOWN_ERROR);
        }
      }
    } else {
      badRequest400(res, INVALID_EMAIL_FORMAT);
    }

  } catch (error) {
    console.log(error)
    serverError500(req)
  }
}

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (validator.isEmail(email)) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        const passwordMatched = await bcrypt.compare(password, existingUser.password);
        if (passwordMatched) {
          const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY);
          success200(res, LOGIN, { token })
        } else {
          badRequest400(res, INVALID_CREDENTIALS)
        }
      } else {
        badRequest400(res, EMAIL_NOT_FOUND)
      }
    } else {
      badRequest400(res, INVALID_EMAIL_FORMAT);
    }
  } catch (error) {
    console.log(error)
    serverError500(req)
  }
}

module.exports = { signup, signin }