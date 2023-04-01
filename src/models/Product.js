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

//  {
//     id: '2',
//     name: 'Product Name',
//     description: 'description description description description description description description description description description description description',
//     price: 15,
//     -sizes: [36, 37, 38, 40, 50],
//     category: 'men',
//     color: 'black',
//     slug: "Product-Name-slug",
//     // productVariants: [] // TODO - Suggest Similar products like amazon
//     -images: ['https://www.jqueryscript.net/images/Minimal-AJAX-Loading-Spinner-Plugin-with-jQuery-pleaseWait.jpg', 'https://www.jqueryscript.net/images/Skeleton-Loading-Screen-jQuery-avnSkeleton.jpg', 'https://www.jqueryscript.net/images/SVG-Progress-Bar-For-jQuery-JavaScript-Angular.jpg'],
//   }