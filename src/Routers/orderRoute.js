const express = require('express')
const router = express.Router()
const auth = require("../middlewares/auth")
const { addNewOrder, getAllOrders, deleteOrderById, deleteAllOrders } = require('../controller/orderController')

// USER
router.post('/order', auth, addNewOrder)

// USER
router.delete('/order/:id', auth, deleteOrderById)

// USER(self only), ADMIN(all)
router.get('/order', auth, getAllOrders)

// ADMIN
router.delete('/order', auth, deleteAllOrders)

module.exports = router;