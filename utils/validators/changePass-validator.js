// External Imports
const { check, validationResult } = require('express-validator')

// Validator
const changePassValidator = [
    // Check new password
    check('newPassword')
        .isLength({ min: 1 })
        .withMessage('Please provide a password')
        .isLength({ min: 6 })
        .withMessage('Your password must have 6 chracters'),

    // Check old password
    check('password')
        .isLength({ min: 1 })
        .withMessage('Please enter your old password')
]

// Validator Handler
const changePassValidatorHandler = (req, res, next) => {
    // Error result
    const errorResult = validationResult(req)

    // If error not occured
    if(Object.keys(errorResult.errors).length === 0) {
        next()
    } else {
        // If error occure, response to client
        res.status(500).json({
            errors: errorResult.formatWith(err => ({msg: err.msg})).mapped()
        })
    }
}


module.exports = {
    changePassValidator,
    changePassValidatorHandler
}