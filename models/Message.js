// External Imports
const mongoose = require('mongoose')

// Message Schema
const messageSchem = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    isSeen: {
        type: Boolean,
        default: false
    }
})

// Message Model
const Message = mongoose.model('Message', messageSchem)

module.exports = Message