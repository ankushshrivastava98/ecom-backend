const { badRequest400, serverError500, success200 } = require('../helpers/requestBuilder');
const productModel = require('./../models/Product');

const addNewProduct = async (req, res) => {
    try {
        const slug = req.body.slug;
        const alreadyExist = await productModel.findOne({ slug })
        if (!alreadyExist) {
            const data = new productModel(req.body);
            const result = await data.save();
            if (result) {
                success200(res, 'Product added successfully.', { data: result })
            } else {
                badRequest400(res, 'Unable to add product, please try again.')
            }
        } else {
            badRequest400(res, `Product already exists with the slug: ${slug}`)
        }
    } catch (e) {
        console.log(e)
        serverError500(res);
    }
}

const getAllProducts = async (req, res) => {
    try {
        const requiredFields = "name price category slug promotionPrice color image"
        const result = await productModel.find({}).select(requiredFields);
        if (result) {
            success200(res, 'All products list', { data: result, count: result.length })
        } else {
            badRequest400(res, 'Products not found, please try again.')
        }
    } catch (e) {
        console.log(e);
        serverError500(res);
    }
}

const getProuctBySlug = async (req, res) => {
    try {
        const slug = req.params.slug
        const result = await productModel.findOne({ slug });
        if (result) {
            success200(res, 'Product', { data: result })
        } else {
            badRequest400(res, `Product not found with slug: ${slug}`)
        }
    } catch (e) {
        console.log(e);
        serverError500(res);
    }
}

const updateProductBySlug = async (req, res) => {
    try {
        const slug = req.body.slug;
        const alreadyExists = await productModel.findOne({ slug });
        if (alreadyExists) {
            const result = await productModel.findOneAndUpdate({ slug }, req.body, { new: true });
            if (result) {
                success200(res, 'Product updated successfully.', { data: result })
            } else {
                badRequest400(res, `Unable to update product with slug: ${slug}.`)
            }
        } else {
            badRequest400(res, `Product not found with the slug: ${slug}`)
        }
    } catch (e) {
        console.log(e);
        serverError500(res);
    }
}

const deleteProductBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const result = await productModel.findOneAndDelete({ slug });
        if (result) {
            success200(res, 'Product deleted successfully', { data: result })
        } else {
            badRequest400(res, `Product not found with slug: ${slug},`)
        }
    } catch (e) {
        console.log(e);
        serverError500(res);
    }
}

const deleteAllProducts = async (req, res) => {
    try {
        const result = await productModel.deleteMany({});
        if (result) {
            success200(res, 'All Products deleted successfully', { data: result })
        } else {
            badRequest400(res, 'Unable to delete all products')
        }
    } catch (e) {
        console.log(e);
        serverError500(res);
    }
}

module.exports = { addNewProduct, getAllProducts, getProuctBySlug, updateProductBySlug, deleteProductBySlug, deleteAllProducts }