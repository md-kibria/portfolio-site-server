// External Imports
const {check} = require('express-validator')

// Validator 
const updateSiteInfoValidtor = [
    // Check copyright,
    check('copyright')
        .trim(),

    // Check about text
    check('aboutText')
        .trim(),
    
    // Check hero title
    check('heroTitle')
        .trim(),

    // Check hero desc
    check('heroDesc')
        .trim()
]

module.exports = {
    updateSiteInfoValidtor
}