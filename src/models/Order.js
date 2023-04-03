const mongose = require("mongoose");
const OrderSchema = new mongose.Schema({
    userId:{
        type: String,
        required:true,
    },
    slug:{
        type: String,
        required:true,
    },
    size:{
        type: String,
        required:true,
    },
    color:{
        type: String,
        required:true,
    },
    quantity:{
        type: String,
        required:true,
    }
})

OrderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
        ret.timeStamp = new Date();
    }
});

const order = new mongose.model('order', OrderSchema);
module.exports = order;