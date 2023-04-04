const express = require('express');
const router = express.Router();
const { signin, signup } = require('../controller/userController')

// USER
router.post("/signin", signin)

// USER
router.post("/signup", signup)

// // Mobile number login
// router.post("/signup-mobile-sendotp", signup)
// router.post("/signup-mobile-verifyotp", signup)

module.exports =  router;