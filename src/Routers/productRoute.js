const express = require('express');
const router = express.Router();
const { addNewProduct, getAllProducts, getProuctBySlug, updateProductBySlug, deleteProductBySlug, deleteAllProducts } = require('../controller/productController');

router.get('/product', getAllProducts)

router.get('/product/:slug', getProuctBySlug)

// ADMIN
router.post('/product', addNewProduct)

// ADMIN
router.put('/product', updateProductBySlug)

// ADMIN
router.delete('/product/:slug', deleteProductBySlug)

// DEVELOPER/ADMIN (opt)
// router.delete('/product', deleteAllProducts)

module.exports = router;