const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth")
const { signin, signup, authenticate, userInformation } = require('../controller/userController')

// USER
router.post("/signin", signin)

// USER
router.post("/signup", signup)

router.post("/authenticate", authenticate)


router.get("/user", auth, userInformation)
// // Mobile number login
// router.post("/signup-mobile-sendotp", signup)
// router.post("/signup-mobile-verifyotp", signup)

module.exports =  router;