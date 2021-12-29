// External Imports
const { check, validationResult } = require('express-validator')
const createHttpError = require('http-errors')
const path = require('path')
const fs = require('fs')

// Internal Imports
const User = require('../../models/User')

// Add User Validator
const addUserValidator = [
    // Check name
    check('name')
        .isLength({ min: 1 })
        .withMessage('Please provide your name')
        .isAlpha('en-US', { ignore: " :.-" })
        .withMessage('Name must not contain anything other then alphabet')
        .trim(),

    // Check email
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value })
                if (user) {
                    throw createHttpError("Email already in use")
                }
            } catch (error) {
                throw createHttpError(error.message)
            }
        })
        .withMessage("Email already in use"),

    // Check password
    check('password')
        .isLength({ min: 1 })
        .withMessage('Please provide a password')
        .isLength({ min: 6 })
        .withMessage('Your password must have 6 chracters'),
]

// Add User Validator Handler
const addUserValidatorHandler = (req, res, next) => {
    
    // Get the validation result
    const errors = validationResult(req)

    // If error not occured, goto next
    if(Object.keys(errors.errors).length === 0) {
        next()
    } else {
        // If error occured

        // Delete file if requested with file
        if(req.file) {
            fs.unlink(path.join(__dirname, `/../../public/uploads/${req.file.filename}`), (err) => {
                if(err) {
                    next(err)
                }
            })
        }

        // Response to the client
        res.status(500).json({
            errors: errors.formatWith(err => ({msg: err.msg})).mapped()
        })
    }
}

module.exports = {
    addUserValidator,
    addUserValidatorHandler
}