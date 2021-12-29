// External Imports
const router = require('express').Router()

// Internal Imports 
const authenticate = require('../utils/authenticate')
const { messageValidator, messageValidatorHandler } = require('../utils/validators/message-validator')
const { sendMessage, getAllMessage, getSingleMessage, deleteMessage } = require('../controllers/message')

// Send Message Router
router.post('/send', messageValidator, messageValidatorHandler, sendMessage)

// Get Message Router
router.get('/', authenticate, getAllMessage)

// Get Single Message Router
router.get('/:id', authenticate, getSingleMessage)

// Delete Message Router
router.delete('/delete/:id', authenticate, deleteMessage)


module.exports = router