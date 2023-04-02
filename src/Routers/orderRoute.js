const express = require('express');
const orderModel = require('./../models/Order');

const router = express.Router();

// [POST]  new Order
router.post('/order', async (req, res) => {
    try {
        const data = new orderModel(req.body);
        const result = data && await data.save();
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'Order placed successfully.',
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: 'Unable to place order, please try again.'
            })
        }

    } catch (e) {
        console.log(e)
    }
})

// [GET]  all orders
router.get('/order', async (req, res) => {
    try {
        const result = await orderModel.find()
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'All Orders',
                count: result.length,
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: 'Orders not found.'
            })
        }
    } catch (e) {
        console.log(e);
    }
})


// [Delete] delete single Order
router.delete('/order/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await orderModel.findByIdAndDelete(id);
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'Order cancelled successfully',
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: `Order not found with id: ${id},`
            })
        }
    } catch (e) {
        console.log(e);
    }
})

// [Delete] delete all Product NOTE: only for developers
router.delete('/order', async (req, res) => {
    try {
        const result = await orderModel.deleteMany({});
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'All Order deleted successfully',
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: 'Unable to delete all orders'
            })
        }
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;