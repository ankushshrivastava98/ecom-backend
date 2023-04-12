const mongose = require("mongoose");
const { contactSchema, locationSchema } = require("./User/informationSchema");
const { Schema } = require("mongoose");
const OrderSchema = new mongose.Schema({
    userId: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    quantity: {
        type: Schema.Types.Number,
        minimum: 1,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    information: {
        contact: contactSchema,
        location: locationSchema,
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