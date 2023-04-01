const express = require('express');
const product = require('./../models/Product');

const router = express.Router();

// [POST] add new Product
router.post('/product', async (req, res) => {
    try {
        const slug = req.body.slug;
        const alreadyExist = await product.findOne({ slug })
        if (!alreadyExist) {
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
        } else {
            res.json({
                status: 'FAILED',
                message: `Product already exists with the slug: ${slug}`
            })
        }
    } catch (e) {
        console.log(e)
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
                count: result.length,
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
router.get('/product/:slug', async (req, res) => {
    try {
        const slug = req.params.slug
        const result = await product.findOne({ slug });
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'Product',
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: `Product not found with slug: ${slug}`
            })

        }
    } catch (e) {
        console.log(e);
    }
})

// [PUT] update Product
router.put('/product', async (req, res) => {
    try {
        const slug = req.body.slug;
        const alreadyExists = await product.findOne({ slug });
        if (alreadyExists) {
            const result = await product.findOneAndUpdate({slug}, req.body, { new: true });
            if (result) {
                res.json({
                    status: 'SUCCESS',
                    message: 'Product updated successfully',
                    data: result,
                })
            } else {
                res.json({
                    status: 'FAILED',
                    message: `Unable to update product with slug: ${slug}.`
                })
            }
        }else{
            res.json({
                status: 'FAILED',
                message: `Product not found with the slug: ${slug}`
            })
        }
    } catch (e) {
        console.log(e);
    }
})

// [Delete] delete single Product
router.delete('/product/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        const result = await product.findOneAndDelete({slug});
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'Product deleted successfully',
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: `Product not found with slug: ${slug},`
            })
        }
    } catch (e) {
        console.log(e);
    }
})

// [Delete] delete all Product NOTE: only for developers
router.delete('/product', async (req, res) => {
    try {
        const result = await product.deleteMany({});
        if (result) {
            res.json({
                status: 'SUCCESS',
                message: 'All Products deleted successfully',
                data: result,
            })
        } else {
            res.json({
                status: 'FAILED',
                message: 'Unable to delete all products'
            })
        }
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;