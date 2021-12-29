// External Imports
const {check, validationResult} = require('express-validator')

// Message Validator
const messageValidator = [
    // Check name
    check('name')
        .isLength({min: 1})
        .withMessage('Please provide your name')
        .isAlpha('en-US', {ignore: ' -.:'})
        .withMessage('Name must contain alphabel')
        .trim(),

    // Check email
    check('email')
        .isEmail()
        .withMessage('Please provide your email')
        .trim(),

    // Check message body
    check('body')
        .isLength({min: 1})
        .withMessage('Please enter your message')
        .trim()
]

// Message Validator Handler
const messageValidatorHandler = (req, res, next) => {
    // Error results
    const errorResults = validationResult(req)

    // If error occured
    if(errorResults.errors.length === 0) {
        next()
    } else {
        // If error occured, response to client
        res.status(400).json({
            errors: errorResults.formatWith(err => ({msg: err.msg})).mapped()
        })
    }
}

module.exports = {
    messageValidator, 
    messageValidatorHandler
}