// External Imports
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        trim: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    img: String
}, {timestamps: true})


// User Model
const User = mongoose.model('User', userSchema)

module.exports = User
