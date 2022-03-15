// External Imports
const path = require('path')
const fs = require('fs')
const { check, validationResult } = require('express-validator')

// Validator 
const addProjectValidator = [
    // Check title
    check('title')
        .isLength({ min: 1 })
        .withMessage('Please provide a title')
        .trim(),

    // Check thumbnail image
    check('thmbImg')
        .custom((value, { req }) => {
            if (req.files.thmbImg.length !== 0) {
                return true
            } else {
                return false
            }
        })
        .withMessage('Please select a thumbnail image'),

    // Check Tools
    check('tools')
        .isLength({ min: 1 })
        .withMessage('Please provide tools name')
        .trim(),

    // Check tags
    check('tags')
        .trim(),

    // Check live link
    check('liveLink')
        .trim(),

    // Check github link
    check('githubLink')
        .trim(),

    // Check screensort image
    check('ssImg')
        .custom((value, { req }) => {
            console.log(req.files.ssImg)
            if (req.files.ssImg.length !== 0) {
                return true
            } else {
                return false
            }
        })
        .withMessage('Please select screensort'),

    // Check description
    check('description')
        .isLength({ min: 1 })
        .withMessage('Please provide description')
        .trim(),

    // Check status
    check('status')
        .isLength({ min: 1 })
        .withMessage('Please select a status')
        .custom((value) => {
            // console.log(value)
            if (value === 'publish' || 'pending') {
                return true
            } else {
                return false
            }
        })
        .withMessage('Status will be pending or publish'),
]

// Validator Haneler
const addProjectValidatorHandler = (req, res, next) => {
    // Error result
    const errorResult = validationResult(req)

    // If error not occured
    if (Object.keys(errorResult.errors).length === 0) {
        next()
    } else {
        // If error occured

        // If requested with thumbnail img file
        if (req.files) {

            if (req.files.thmbImg) {
                fs.unlink(path.join(__dirname, `/../../public/uploads/${req.files.thmbImg[0].filename}`), (err) => {
                    if (err) {
                        next(err)
                    }
                })
            }


            // If requested with screensort imgs file
            if (req.files.ssImg) {
                for (let i = 0; i < req.files.ssImg.length; i++) {
                    fs.unlink(path.join(__dirname, `/../../public/uploads/${req.files.ssImg[i].filename}`), (err) => {
                        if (err) {
                            next(err)
                        }
                    })
                }
            }

        }

        // Response to client
        res.status(500).json({
            errors: errorResult.formatWith(err => ({ msg: err.msg })).mapped()
        })
    }
}


module.exports = {
    addProjectValidator,
    addProjectValidatorHandler
}