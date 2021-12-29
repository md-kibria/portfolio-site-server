// External Imports
const fs = require('fs')
const path = require('path')

// Internal Imports
const Skill = require('../models/Skill')
const notFound = require('../utils/notFound')

// Add-Skill Controller
const addSkill = async (req, res, next) => {

    // Get title and description from the request
    const { title, description } = req.body

    // Add skill item to database
    let newSkill = new Skill({
        title,
        description,
        img: req.file.filename
    })
    try {
        // Save to database
        let skill = await newSkill.save();

        // Response to client
        res.status(201).json({
            msg: 'Skill added successfully',
            skill
        })

    } catch (error) {
        next(error)
    }
}

// Get-Skill Controller
const getSkills = async (req, res, next) => {
    try {
        // Find all items
        const allSkills = await Skill.find().select({
            __v: 0,
        })

        if (allSkills.length !== 0) {
            // If skill found, response to client
            res.status(200).json({
                msg: "All skills",
                allSkills
            })
        } else {
            // If skill not found, response to client
            notFound(res, "Skills not found")
        }
    } catch (error) {
        next(error)
    }
}

// Update-Skill Controller
const updateSkill = async (req, res, next) => {
    try {

        // Get the skill item from request parameter
        const { id } = req.params

        // Get data from request body
        const { title, description } = req.body

        // Find the skill item if exist
        const skillItem = await Skill.findById(id)

        // If skill item id exist
        if (skillItem) {
            // New updated skill item
            let newUpdatedSkill = {
                title: title || skillItem.title,
                description: description || skillItem.description,
                img: req.file ? req.file.filename : skillItem.img
            }

            // If image is update, then delete the old image
            if (req.file) {
                fs.unlink(path.join(__dirname, `/../public/uploads/${skillItem.img}`), (err) => {
                    if (err) {
                        next(err)
                    }
                })
            }

            // If skill item exist
            if (skillItem) {
                // Update skill item
                const updatedSkill = await Skill.findByIdAndUpdate(id, { $set: newUpdatedSkill }, { new: true })

                // Response to the client
                res.status(201).json({
                    msg: "Skill item updated successfully",
                    updatedSkill
                })
            }
        } else {
            // If skil item not found

            // If requested with a file, Deleete the file
            if (req.file) {
                fs.unlink(path.join(__dirname, `/../public/uploads/${req.file.filename}`), (err) => {
                    if (err) {
                        next(err)
                    }
                })
            }

            // Response to the client
            notFound(res, "Skill item is not found")
        }

    } catch (error) {
        next(error)
    }
}

// Delete-Skill Item Controller
const deleteSkill = async (req, res, next) => {
    try {
        // Get the skill item id from request parameter
        const { id } = req.params

        // Find the skill item
        const skillItem = await Skill.findById(id)

        if (skillItem) {
            // Item delete
            const deletedItem = await Skill.findByIdAndDelete(id)

            // Delete Image File
            fs.unlink(path.join(__dirname, `/../public/uploads/${deletedItem.img}`), (err) => {
                if (err) {
                    next(err)
                }
            })

            // Response to client
            res.status(200).json({
                msg: "Skill item deleted successfully",
                deletedItem
            })
        } else {
            // If the skill already deleted
            notFound(res, 'No skill item found!')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addSkill,
    getSkills,
    updateSkill,
    deleteSkill
}