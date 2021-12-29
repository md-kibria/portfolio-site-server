// External Imports
const router = require('express').Router()

// Internal Imports
const authenticate = require('../utils/authenticate')
const breaker = require('../utils/breaker')
const {setContactInfo, getContactInfo, updateContactInfo} = require('../controllers/contact')

// Set Contact Info
router.post('/add', authenticate, breaker, setContactInfo)

// Get Contact Info
router.get('/', authenticate, getContactInfo)

// Update Contact Info
router.put('/update/:id', authenticate, updateContactInfo)

module.exports = router