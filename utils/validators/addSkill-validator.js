// External Imports
const { check, validationResult } = require('express-validator')
const path = require('path')
const { unlink } = require('fs')

// Add Skill Validator
const addSkillValidator = [
    // Check title
    check('title')
        .isLength({ min: 1 })
        .withMessage('Please provide a title')
        .isAlpha('en-US', { ignore: ' -' }) // Only space and hifen(-) allowed with alphabet
        .withMessage('Title must not contain anything other than alphabet')
        .trim(),

    // Check description
    check('description')
        .isLength({ min: 1 })
        .withMessage('Please provide description')
        .trim(),

    // Check image
    check('img')
        .custom((value, {req}) => {
            if(req.file.mimetype === 'image/png' || 'image/jpeg') {
                return true
            } else {
                return false
            }
        })
        .withMessage('Please select a related image'),
]


// Add Skill Validator Handler
const addSkillValidatorHandler = function (req, res, next) {
    // Get the validation result
    const errors = validationResult(req);

    // If not error, goto next
    if (Object.keys(errors.errors).length === 0) {
        next()
    } else {

        // If Error Occured...
        // Delete unexpected uploaded file
        if (req.file) {
            const { filename } = req.file
            unlink(path.join(path.join(__dirname, `/../../public/uploads/${filename}`)),(err, data) => {
                    if (err) console.log(err)
                }
            )
        }

        // Response The Error
        res.status(500).json({
            errors: errors.formatWith(err => ({ msg: err.msg })).mapped()
        })
    }
}

module.exports = {
    addSkillValidator,
    addSkillValidatorHandler
}