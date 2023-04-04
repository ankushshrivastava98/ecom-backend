const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const { addNewOrder, getAllOrders, deleteOrderById, deleteAllOrders } = require('../controller/orderController');


router.post('/order', auth, addNewOrder)

router.get('/order', auth, getAllOrders)

router.delete('/order/:id', auth, deleteOrderById)

// router.delete('/order', auth, deleteAllOrders)

module.exports = router;