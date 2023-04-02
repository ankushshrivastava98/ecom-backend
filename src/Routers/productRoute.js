const express = require('express');
const router = express.Router();
const { addNewProduct, getAllProducts, getProuctBySlug, updateProductBySlug, deleteProductBySlug, deleteAllProducts } = require('../controller/productController');

router.post('/product', addNewProduct)

router.get('/product', getAllProducts)

router.get('/product/:slug', getProuctBySlug)

router.put('/product', updateProductBySlug)

router.delete('/product/:slug', deleteProductBySlug)

// router.delete('/product', deleteAllProducts)

module.exports = router;