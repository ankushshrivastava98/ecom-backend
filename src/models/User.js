const mongose = require("mongoose");
const UserSchema = new mongose.Schema({
    username: {
        type: String,
    },
    // phone: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    information:{
        type: Array,
        contact:{
            type: Object,
            required: true,
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
            altphone: {
                type: String,
                required: true
            },
        },
        location: {
            type: Object,
            required: true,
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            postcode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
        }  
    } 
})

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
        ret.timeStamp = new Date();
    }
});

const user = new mongose.model('user', UserSchema);
module.exports = user;