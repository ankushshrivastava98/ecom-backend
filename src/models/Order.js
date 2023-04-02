const mongose = require("mongoose");
const OrderSchema = new mongose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    city: {
        type: String,
    },
    postCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    altPhone: {
        type: String,
        required: true
    },
    productDetails:{
        type: Object,
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
// {
//   "email": "afasdd@aa.com",
//   "name": "dasfsdadf",
//   "phone": "12w324",
//   "address": "aszdfasd",
//   "city": "asdfasdf",
//   "postCode": "asdffas",
//   "country": "asdfasf",
//   "altPhone": "234235AAS"
// }