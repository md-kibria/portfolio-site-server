// External Imports 
const {check, validationResult} = require('express-validator')
const createHttpError = require('http-errors')

// Internal Imports
const Subscriber = require('../../models/Subscriber')

// Validator
const addSubscriberValidator = [
    // Check email
    check('email')
        .isEmail()
        .withMessage("Please provide your email")
        .custom(async (value) => {
            // Find subs by this email
            const subs = await Subscriber.findOne({email: value})

            // If find
            if(subs) {
                throw createHttpError("You have already subscribed")
            } else {
                return subs
            }
        })
        .trim()
]

// Validator Handler
const addSubscriberValidatorHandler = (req, res, next) => {
    // Error result 
    const errorResult = validationResult(req)

    // If error occured
    if(errorResult.errors.length === 0) {
        next()
    } else {
        // Response to client
        res.status(400).json({
            errors: errorResult.formatWith(err => ({msg: err.msg})).mapped()
        })
    }
}

module.exports = {
    addSubscriberValidator,
    addSubscriberValidatorHandler
}