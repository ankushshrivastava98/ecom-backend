const { success200, badRequest400 } = require('../helpers/requestBuilder');
const orderModel = require('./../models/Order');

const addNewOrder = async (req, res) => {
    try {
        const { slug, size, color, quantity } = req.body;
        const userId = req.userId;
        const data = new orderModel({ slug, size, color, quantity, userId });
        const result = data && await data.save();
        if (result) {
            success200(res, "Order placed successfully", { data: result });
        } else {
            badRequest400(res, 'Unable to place order, please try again.');
        }
    } catch (e) {
        console.log(e)
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
    }
}

module.exports = { addNewOrder, getAllOrders, deleteOrderById, deleteAllOrders }