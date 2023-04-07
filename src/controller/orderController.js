const { getUpdatedProductDataIfInStock } = require('../helpers/Utils');
const { success200, badRequest400, serverError500 } = require('../helpers/requestBuilder');
const productModel = require('../models/Product');
const orderModel = require('./../models/Order');

const addNewOrder = async (req, res) => {
    try {
        const { slug, size, color, quantity } = req.body;
        const userId = req.userId;
        const orderedProduct = await productModel.findOne({ slug })
        let updatedProductData = getUpdatedProductDataIfInStock(orderedProduct, { size, color, quantity })
        
        if (updatedProductData) {
            const data = new orderModel({ slug, size, color, quantity, userId });
            const result = data && await data.save();
            if (result) {
                await productModel.findOneAndUpdate({ slug }, updatedProductData, { new: true });
                success200(res, "Order placed successfully", { data: result });
            } else {
                badRequest400(res, 'Unable to place order, please try again.');
            }
        } else {
            badRequest400(res, 'Product not available or Out of Stock');
        }

    } catch (e) {
        console.log(e)
        serverError500(res);
    }
}

const getAllOrders = async (req, res) => {
    try {
        const result = await orderModel.find({ userId: req.userId })
        if (result) {
            success200(res, "All Orders", { data: result });
        } else {
            badRequest400(res, 'Orders not found.');
        }
    } catch (e) {
        console.log(e);
        serverError500(res);
    }
}

const deleteOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await orderModel.findByIdAndDelete(id);
        if (result) {
            success200(res, "Order cancelled successfully", { data: result });
        } else {
            badRequest400(res, `Order not found with id: ${id},`);
        }
    } catch (e) {
        console.log(e);
        serverError500(res);
    }
}

const deleteAllOrders = async (req, res) => {
    try {
        const result = await orderModel.deleteMany({});
        if (result) {
            success200(res, "All Order deleted successfully", { data: result });
        } else {
            badRequest400(res, 'Unable to delete all orders');
        }
    } catch (e) {
        console.log(e);
        serverError500(res);
    }
}

module.exports = { addNewOrder, getAllOrders, deleteOrderById, deleteAllOrders }