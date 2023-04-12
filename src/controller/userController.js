const userModel = require("../models/User/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { badRequest400, serverError500, created201, success200, unauthorized401 } = require("../helpers/requestBuilder");
const validator = require('validator');
const { EMAIL_TAKEN, SIGNUP, LOGIN, INVALID_EMAIL_FORMAT, INVALID_CREDENTIALS, EMAIL_NOT_FOUND, UNAUTHORIZED, TOKEN_REQUIRED, AUTHORIZED, INFORMATION_LIMIT } = require("../message/userMessage");
const { UNKNOWN_ERROR } = require("../message/common");

const SECRET_KEY = 'ha34523jiosf123dhfj';
const TOKEN_EXPIRE_TIME = "3000s";
const HASH_SALT = 7;
const INFORMATION_MAX_LIMIT = 3;

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
          created201(res, SIGNUP, { data: { token } })
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
    serverError500(res)
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
          const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY, {
            expiresIn: TOKEN_EXPIRE_TIME
          });
          success200(res, LOGIN, { data: { token } })
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
    serverError500(res)
  }
}

const authenticate = (req, res) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const check = jwt.verify(token, SECRET_KEY);
      check && success200(res, AUTHORIZED)
    } else {
      unauthorized401(res, TOKEN_REQUIRED)
    }
  } catch (error) {
    console.log(error)
    unauthorized401(res, UNAUTHORIZED)
    // serverError500(res)
  }
};

const userInformation = async (req, res) => {
  try {
    const requiredFields = "username email information"
    const userId = req.userId;
    const userData = (await userModel.findById(userId).select(requiredFields)).toJSON();
    if (userData) {
      delete userData.id
      delete userData.timeStamp
      success200(res, 'User information', { data: userData })
    }
  } catch (error) {
    console.log(error)
    serverError500(res)
  }
};

const updateUserInformation = async (req, res) => {
  try {
    const userId = req.userId;
    const oldUserData = await userModel.findById(userId);
    const updatedUserData = {
      ...oldUserData.toJSON(),
      information: req.body.information
    }
    if (updatedUserData.information.length > INFORMATION_MAX_LIMIT){
      badRequest400(res, INFORMATION_LIMIT)
    }
    else {
      const userData = await userModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
      console.log(updatedUserData, userId)
      if (userData) {
        success200(res, 'User Information updated successfully', { data: userData })
      } else {
        badRequest400(res, 'Unable to update user Information')
      }
    }
  } catch (error) {
    console.log(error)
    serverError500(res)
  }
};
module.exports = { signup, signin, authenticate, userInformation, updateUserInformation }