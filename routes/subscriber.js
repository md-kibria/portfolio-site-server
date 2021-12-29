// External Imports
const router = require('express').Router()

// Internal Imports
const authenticate = require('../utils/authenticate')
const { addSubscriberValidator, addSubscriberValidatorHandler } = require('../utils/validators/addSubs-validator')
const { addSubscriber, getAllSubscribers, deleteSubscriber } = require('../controllers/subscriber')

// Add Subscriber Router
router.post('/add', addSubscriberValidator, addSubscriberValidatorHandler, addSubscriber)

// Get All Subscriber Router
router.get('/', authenticate, getAllSubscribers)

// Get All Subscriber Router
router.delete('/delete/:id', authenticate, deleteSubscriber)

module.exports = router