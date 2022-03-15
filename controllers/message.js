//Internal Imports
const Message = require('../models/Message')
const notFound = require('../utils/notFound')

// Send Message Controller
const sendMessage = async (req, res, next) => {
    // Get data from request body
    const { name, email, body } = req.body

    // New message
    const newMessage = new Message({
        name,
        email,
        body
    })

    try {
        // Save the message
        const message = await newMessage.save()

        // Response to client
        res.status(201).json({
            msg: "Message send succcessfylly",
            message
        })
    } catch (error) {
        next(error)
    }
}

// Get All Message Controller
const getAllMessage = async (req, res, next) => {
    try {
        // Get all message
        const messages = await Message.find().select({ __v: 0 })

        // If message find
        if (messages.length !== 0) {
            // Response to client
            res.status(200).json({
                msg: 'All messages',
                total: messages.length,
                messages
            })
        } else {
            // If messages not found
            notFound(res, "Messages not found")
        }
    } catch (error) {
        next(err)
    }
}

// Get Single Message Controller
const getSingleMessage = async (req, res, next) => {
    // Get id from request parameter
    const { id } = req.params

    try {
        // Find the message 
        const message = await Message.findById(id).select({__v: 0})
        
        // If message found
        if(message) {

            // Set isSeen: true
            await Message.findByIdAndUpdate(id, {$set: {isSeen: true}})

            // Response to client
            res.status(200).json({
                msg: "Single message",
                message
            })
        } else {
            // If mesage not found
            notFound(res, "Message not found")
        }
    } catch (error) {
        next(error)
    }
}

// Delete Message Controller
const deleteMessage = async (req, res, next) => {
    // Get id from request parameter
    const { id } = req.params

    try {
        // Find the message 
        const message = await Message.findById(id)
        
        // If message found
        if(message) {
            // Delete the message
            const deletedMessage = await Message.findByIdAndDelete(id)

            // Response to client
            res.status(200).json({
                msg: "Message deleted successfully",
                message: deletedMessage
            })
        } else {
            // If mesage not found
            notFound(res, "Message not found for delete")
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    sendMessage,
    getAllMessage,
    getSingleMessage,
    deleteMessage
}