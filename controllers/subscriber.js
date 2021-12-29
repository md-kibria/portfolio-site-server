// Internal Imports
const Subscriber = require('../models/Subscriber')
const notFound = require('../utils/notFound')

// Add Subscriber
const addSubscriber = async (req, res, next) => {
    // Get email from request body
    const { email } = req.body

    // New subscribe
    const newSubscribe = new Subscriber({ email })

    try {
        // Save new subscriber
        const subscriber = await newSubscribe.save()

        // Response to client
        res.status(201).json({
            msg: "Subscribed successfully",
            subscriber
        })

    } catch (error) {
        next(error)
    }
}

// Get All Subscribers
const getAllSubscribers = async (req, res, next) => {
    try {
        // Find all subscriber
        const subscribers = await Subscriber.find().select({ __v: 0 })

        // If find subscriber
        if(subscribers.length !== 0) {
            // Responsive to client
            res.status(200).json({
                msg: "All subscribers",
                total: subscribers.length,
                subscribers
            })
        } else {
            // If subscrivers not found
            notFound(res, "No subscriber found")
        }
    } catch (error) {
        next(error)
    }
}

// Delete Subscriber
const deleteSubscriber = async (req, res, next) => {
    // Get subscribe id from request params
    const {id} = req.params
    try {
        // Find the subscriber 
        const subscribe = await Subscriber.findById(id)

        if(subscribe) {
            // If find subscriber, delete the subscription
            const deletedSubs = await Subscriber.findByIdAndDelete(id)
            
            // Respondive to client
            res.status(200).json({
                msg: "Subscriber deleted successfully",
                subscriber: deletedSubs
            })
        } else {
            // If not found, response to client
            notFound(res, "Subscriber not found for delete")
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addSubscriber,
    getAllSubscribers,
    deleteSubscriber
}