const express = require('express');
const productModel = require('./../models/Product');

const router = express.Router();

// [POST] add new Product
router.post('/product', async (req, res) => {
    try {
        const slug = req.body.slug;
        const alreadyExist = await productModel.findOne({ slug })
        if (!alreadyExist) {
            const data = new productModel(req.body);
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
        const requiredFields = "name price category slug promotionPrice color image"
        const result = await productModel.find({}).select(requiredFields);
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
        const result = await productModel.findOne({ slug });
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
        const alreadyExists = await productModel.findOne({ slug });
        if (alreadyExists) {
            const result = await productModel.findOneAndUpdate({slug}, req.body, { new: true });
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
        const result = await productModel.findOneAndDelete({slug});
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
        const result = await productModel.deleteMany({});
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