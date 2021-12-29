// External imports
const { check, validationResult } = require('express-validator')

// Validator 
const updateProjectValidator = [
    
    // Check title
    check('title')
        .trim(),
    
    // Check tools
    check('tools')
        .trim(),

    // Check tags
    check('tags')
        .trim(),

    // Check Live Link
    check('liveLink')
        .trim(),

    // Check Github Link
    check('githubLink')
        .trim(),

    // Check description
    check('description')
        .trim(),

    // Check status
    check('status')
        .trim()
]


 module.exports = {
    updateProjectValidator
}