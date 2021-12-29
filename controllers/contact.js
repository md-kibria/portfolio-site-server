// Internal Imports
const Contact = require('../models/Contact')
const notFound = require('../utils/notFound')

// Set Contact Info
const setContactInfo = async (req, res, next) => {
    try {
        // Add contact info
        const contact = new Contact(req.body)

        // Save contact info
        const newContact = await contact.save()

        // Response to client
        res.status(201).json({
            msg: 'Contact info added successfully',
            newContact
        })

    } catch (error) {
        next(error)
    }
}

// Get Contact Info
const getContactInfo = async (req, res, next) => {
    try {
        // Find all contact info
        const contactInfo = await Contact.find().limit(1)

        // If found contactInfo
        if (contactInfo.length !== 0) {
            res.status(200).json({
                msg: "Contact info",
                contactInfo: contactInfo[0]
            })
        } else {
            // If contact info not found
            notFound(res, "Contact info not found")
        }
    } catch (error) {
        next(error)
    }
}

// Update Contact Info
const updateContactInfo = async (req, res, next) => {
    // Get id from requst
    const { id } = req.params

    try {
        // Find the contact info from db
        const contactInfo = await Contact.findById(id)

        // If contact info found by this id
        if (contactInfo) {

            // Get data from body
            const { address, email, phone } = req.body

            // New updated contact info
            const newContactInfo = {
                address: address || contactInfo.address,
                email: email || contactInfo.email,
                phone: phone || contactInfo.phone
            }

            // Update contact info
            const updatedContactInfo = await Contact.findByIdAndUpdate(id, {$set: newContactInfo}, {new: true})

            // Response to client
            res.status(201).json({
                msg: "Contact info updated successfully",
                contactInfo: updatedContactInfo
            })

        } else {
            // If contact info not found
            notFound(res, "Contact info not found for update")
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    setContactInfo,
    getContactInfo,
    updateContactInfo,
}