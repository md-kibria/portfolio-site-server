// External Imports
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Internal Imports
const User = require('../models/User')
const notFound = require('../utils/notFound')

// Register User Controller
const registerUser = async (req, res, next) => {
    try {
        // Get data from request body
        const { name, email, password } = req.body

        // Hash password
        const hash = await bcrypt.hash(password, 11)

        // Define new user
        const newUser = new User({
            name,
            email,
            password: hash,
            img: req.file ? req.file.filename : null
        })

        // Register new user
        const user = await newUser.save()

        // Token
        let token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            img: user.img,
            phone: user.phone,
            address: user.address,
            join: user.createdAt,
        }, process.env.JWT_SECRET)

        // Response to client
        res.status(201).json({
            msg: "Singup successfully",
            user,
            token: `Bearer ${token}`
        })

    } catch (error) {
        next(error)
    }
}

// Login User Controller
const loginUser = async (req, res, next) => {
    try {
        // Get data from request body
        const { email, password } = req.body

        // User
        const user = await User.findOne({ email })

        // Check password 
        let corrPass = await bcrypt.compare(password, user.password)

        // If password is correct
        if (corrPass) {
            // Token
            let token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                img: user.img,
                phone: user.phone,
                address: user.address,
                join: user.createdAt,
            }, process.env.JWT_SECRET)

            // Response to client
            res.status(200).json({
                msg: "Successfylly login",
                token: `Bearer ${token}`
            })

        } else {
            // If wrong password,Response to client
            res.status(403).json({
                errors: {
                    password: {
                        msg: "Password dosen't match"
                    }
                }
            })
        }
    } catch (error) {
        next(error)
    }

}

// Update User Controller
const updateUser = async (req, res, next) => {
    try {
        // Get the user id from requrest params
        const { id } = req.params

        // Get the data from request body
        const { name, email, phone, address } = req.body

        // Check the user 
        const user = await User.findById(id)

        if (user) {
            // Define update user object
            const updateNewUser = {
                name: name || user.name,
                email: email || user.email,
                phone: phone || user.phone,
                address: address || user.address,
                img: req.file ? req.file.filename : user.img
            }

            // If update image, delete the previous image
            if (req.file) {
                fs.unlink(path.join(__dirname, `/../public/uploads/${user.img}`), (err) => {
                    if (err) {
                        next(err)
                    }
                })
            }

            // Update user
            const updatedUser = await User.findByIdAndUpdate(id, { $set: updateNewUser }, { new: true }).select({
                password: 0,
                __v: 0
            })

            // Response to client
            res.status(201).json({
                msg: "User updated successfully",
                user: updatedUser
            })
        } else {
            // If user not exist, response to client
            notFound(res, "User is not found for update")
        }
    } catch (error) {
        next(error)
    }
}

// Get All User Controller
const getAllUsers = async (req, res, next) => {

    try {
        // Get all users from db
        const users = await User.find().select({
            password: 0,
            __v: 0
        })

        // If users found
        if (users.length !== 0) {
            // Response to client
            res.status(200).json({
                msg: "All users",
                totalUser: users.length,
                users
            })
        } else {
            // If users not found response to client
            notFound(res, "Users not found")
        }
    } catch (error) {
        next(error)
    }
}

// Get Single User Controller
const getSingleUser = async (req, res, next) => {
    try {
        // User id from request parameter
        const { id } = req.params

        // Find the single user
        const user = await User.findById(id).select({
            password: 0,
            __v: 0
        })

        if (user) {
            // If user found, response to client
            res.status(200).json({
                msg: "Single user",
                user
            })
        } else {
            // If user not found, response to client
            notFound(res, "User not found")
        }
    } catch (error) {
        next(error)
    }
}

// Delete User Controller
const deleteUser = async (req, res, next) => {
    try {
        // Get id from request parameter
        const { id } = req.params

        // Find the user
        const user = await User.findById(id)

        if (!user) {
            // If user not found, response to client
            notFound(res, "User is not found for delete")
        } else {
            // If user found, delete the user
            const deletedUser = await User.findByIdAndDelete(id)

            // Delete the user image, if exist
            if (deletedUser.img) {
                fs.unlink(path.join(__dirname, `/../public/uploads/${deletedUser.img}`), (err) => {
                    if (err) {
                        next(err)
                    }
                })
            }

            // Response to client
            res.status(200).json({
                msg: "User deleted successfully",
                user: deletedUser
            })
        }

    } catch (error) {
        next(error)
    }
}

// Change Password Controller
const changePass = async (req, res, next) => {
    try {
        // Get new password from request body
        const { newPassword, password } = req.body

        // Find the user
        const user = await User.findOne({ _id: req.user._id })

        // Compare odl password 
        let isTrue = await bcrypt.compare(password, user.password)

        // If old password is correct
        if (isTrue) {
            // Hash the new password
            let hash = await bcrypt.hash(newPassword, 11)

            // Update user with the new password
            let updatedUser = await User.findByIdAndUpdate(user._id, { $set: { password: hash } }, { new: true })

            // Response to client
            res.status(201).json({
                msg: "Password updated successfylly",
                user: updatedUser
            })

        } else {
            // If old password is wrong, response to client
            res.status(403).json({
                errors: {
                    password: {
                        msg: "Your password is wrong"
                    }
                }
            })
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    changePass
}