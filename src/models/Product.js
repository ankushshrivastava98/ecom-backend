const mongose = require("mongoose");
const productSchema = new mongose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    promotionPrice: {
        type: Number
    },
    color: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: [
        {
            size: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})
// description, sizes, images not required for all products list

productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
        ret.timeStamp = new Date();
    }
});

const product = new mongose.model('product', productSchema);
module.exports = product;
