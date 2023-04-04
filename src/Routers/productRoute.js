const express = require('express');
const router = express.Router();
const { addNewProduct, getAllProducts, getProuctBySlug, updateProductBySlug, deleteProductBySlug, deleteAllProducts } = require('../controller/productController');

// ANYONE
router.get('/product', getAllProducts)

// ANYONE 
router.get('/product/:slug', getProuctBySlug)

// ADMIN
router.post('/product', addNewProduct)

// ADMIN
router.put('/product', updateProductBySlug)

// ADMIN
router.delete('/product/:slug', deleteProductBySlug)

// DEVELOPER
router.delete('/product', deleteAllProducts)

module.exports = router