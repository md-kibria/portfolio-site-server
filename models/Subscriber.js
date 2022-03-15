// External Imports
const mongoose = require('mongoose')

// Subscriber Schema 
const subscriberSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})

// Subscriber Model
const Subscriber = mongoose.model('Subscriber', subscriberSchema)

module.exports = Subscriber