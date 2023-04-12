const mongose = require("mongoose");
const { locationSchema, contactSchema } = require("./informationSchema");
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
    information: [
        {
            _id:false,
            type: {
                type: String,
                required:true,
            },
            contact: {
                type: contactSchema,
            },
            location: {
                type: locationSchema,
            }
        }
    ]
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