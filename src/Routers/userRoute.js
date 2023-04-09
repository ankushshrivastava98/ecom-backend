const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth")
const { signin, signup, authenticate, userInformation, updateUserInformation } = require('../controller/userController')

// USER
router.post("/signin", signin)

// USER
router.post("/signup", signup)

router.get("/authenticate", authenticate)


router.get("/user", auth, userInformation)


router.put("/user", auth, updateUserInformation)
// // Mobile number login
// router.post("/signup-mobile-sendotp", signup)
// router.post("/signup-mobile-verifyotp", signup)

module.exports =  router;