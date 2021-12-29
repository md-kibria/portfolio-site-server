// External Imports 
const mongoose = require('mongoose')

// Contact Schema 
const contactSchema = mongoose.Schema({
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }
})

// Contact Model
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact