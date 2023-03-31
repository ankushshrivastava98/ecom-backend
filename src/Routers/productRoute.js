const express = require('express');
const product = require('./../models/Product');

const router = express.Router();

// [POST] add new Product
router.post('/product', async (req, res) => {
    const data = new product(req.body);
    const result = await data.save();
    if (result) {
        res.json({
            status: 'SUCCESS',
            message: 'Product added successfully.',
            data: result,
        })

    } else {
        res.json({
            status: 'FAILED',
            message: 'Unable to add product, please try again.'
        })
    }
})

// [GET] get All products
router.get('/product', async (req, res) => {
    try {
        const result = await product.find();
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'All products list',
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: 'Products not found, please try again.'
            })
        }
    } catch (e) {
        console.log(e);
    }
})

// [GET] get Single product
router.get('/product/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await product.findById(id);
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'Product',
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: `Product not found with id: ${id}`
            })

        }
    } catch (e) {
        console.log(e);
    }
})

// [PUT] update Product
router.put('/product', async (req, res) => {
    try {
        const id = req.body.id;
        const result = await product.findByIdAndUpdate(id, req.body, { new: true });
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'Product updated successfully',
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: `Unable to update product with id: ${id}.`
            })
        }
    } catch (e) {
        console.log(e);
    }
})

// [Delete] delete Product
router.delete('/product/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await product.findByIdAndDelete(id);
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'Product deleted successfully',
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: `Unable to delete product with id: ${id},`
            })
        }
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;