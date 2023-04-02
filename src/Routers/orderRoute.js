const express = require('express');
const router = express.Router();
const { addNewOrder, getAllOrders, deleteOrderById, deleteAllOrders } = require('../controller/orderController');


router.post('/order', addNewOrder)

router.get('/order', getAllOrders)

router.delete('/order/:id', deleteOrderById)

// router.delete('/order', deleteAllOrders)

module.exports = router;