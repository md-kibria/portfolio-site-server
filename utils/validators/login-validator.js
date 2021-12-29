// External Imports
const { check, validationResult } = require('express-validator')
const createHttpError = require('http-errors')

// Internal Imports
const User = require('../../models/User')

// Login Validator 
const loginValidator = [
    // Chek email
    check('email')
        .isEmail()
        .withMessage('Please enter your valid email')
        .trim()
        .custom(async (email) => {
            // Find the user with the email
            const user = await User.findOne({ email })

            if (user) {
                // If user exist
                return user
            } else {
                throw createHttpError('User not found')
            }
        }),

    // Chekc password
    check('password')
        .isLength({ min: 1 })
        .withMessage("Please enter your password")
]


// Login Validator Handler
const loginValidatorHandler = (req, res, next) => {
    // Error results
    const errorResult = validationResult(req)

    if(Object.keys(errorResult.errors).length === 0) {
        // If there are no error
        next()
    } else {
        // If error occured, response to client
        res.status(500).json({
            errors: errorResult.formatWith(err => ({msg: err.msg})).mapped()
        })
    }
}

module.exports = {
    loginValidator,
    loginValidatorHandler
}