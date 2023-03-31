const mongose = require("mongoose");
const productSchema = new mongose.Schema({

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
    slug: {
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
})

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

// {
//    "id": "2",
//    "name": "Nike LeBron 19 Low",
//    "price": 140,
//    "category": "unisex",
//    "slug": "Nike-LeBron-19-Low",
//    "promotionPrice": null,
//    "color": "white",
//    "image": "https://www.jqueryscript.net/images/Skeleton-Loading-Screen-jQuery-avnSkeleton.jpg"
// },

// [-Reference-]
// https://www.youtube.com/watch?v=rdIbYY1U10o