const contactSchema = {
    _id: false,
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
}

const locationSchema = {
    _id: false,
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

module.exports = {contactSchema, locationSchema}