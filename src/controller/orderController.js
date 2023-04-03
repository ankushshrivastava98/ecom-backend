const orderModel = require('./../models/Order');

const addNewOrder = async (req, res) => {
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
}

const getAllOrders = async (req, res) => {
    try {
        const result = await orderModel.find({}).select({userId: req.userId})
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
}

const deleteOrderById = async (req, res) => {
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
}

const deleteAllOrders = async (req, res) => {
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
}

module.exports = {addNewOrder, getAllOrders, deleteOrderById, deleteAllOrders}