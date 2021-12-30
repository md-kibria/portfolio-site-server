// External Imports
const router = require('express').Router()

// Internal Imports
const { addSkill, getSkills, updateSkill, deleteSkill } = require('../controllers/skills')
const { addSkillValidator, addSkillValidatorHandler } = require('../utils/validators/addSkill-validator')
const upload = require('../utils/upload')
const authenticate = require('../utils/authenticate')

// Add Skill Route
router.post('/add', authenticate, upload.single('img'), addSkillValidator, addSkillValidatorHandler, addSkill)

// Get Skills Route
router.get('/', getSkills)

// Update Skill Route
router.put('/update/:id', authenticate, upload.single('img'), updateSkill)

// Delete Skills Route
router.delete('/delete/:id', authenticate, deleteSkill)

module.exports = router