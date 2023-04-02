const express = require('express');
const router = express.Router();
const { signin, signup } = require('../controller/userController')

// Email Password login
router.post("/signin", signin)
router.post("/signup", signup)

// // Mobile number login
// router.post("/signup-mobile-sendotp", signup)
// router.post("/signup-mobile-verifyotp", signup)

module.exports =  router;