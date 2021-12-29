// External Imports
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Skill Schema
const skillSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true
    }
})

// Skill Model
const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill