// External Imports 
const mongoose = require('mongoose')

// Site Info Schema
const siteInfoSchema = mongoose.Schema({
    logo: {
        type: String,
        trim: true
    },
    fav: {
        type: String,
        trim: true
    },
    copyright: {
        type: String,
        trim: true
    },
    socialLinks: {
        type: [{
            media: String,
            link: String
        }]
    },
    aboutText: {
        type: String,
        required: true,
        trim: true
    },
    aboutImg: {
        type: String,
        required: true,
        trim: true
    },
    heroTitle: {
        type: String,
        required: true,
        trim: true
    },
    heroDesc: {
        type: String,
        required: true,
        trim: true
    },
    heroImg: {
        type: String,
        required: true,
        trim: true
    }
})



// Site Info Model
const SiteInfo = mongoose.model('SiteInfo', siteInfoSchema)

module.exports = SiteInfo