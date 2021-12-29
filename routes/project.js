// External Imports
const router = require('express').Router()

// Internal Imports 
const authenticate = require('../utils/authenticate')
const { createProject, getAllProjects, updateProject, deleteProject, getSingleProject, getPublishProjects, getPendingProjects, searchProjects } = require('../controllers/project')
const upload = require('../utils/upload')
const { addProjectValidator, addProjectValidatorHandler } = require('../utils/validators/addProject-validator')
const { updateProjectValidator } = require('../utils/validators/updateProject-validator')

// Create Project Router
router.post(
    '/create',
    authenticate,
    upload.fields([
        {
            name: 'thmbImg',
            maxCount: 1
        },
        {
            name: 'ssImg'
        }
    ]),
    addProjectValidator,
    addProjectValidatorHandler,
    createProject,
)

// Get All Projects
router.get('/', authenticate, getAllProjects)

// Get All Publish Projects
router.get('/publish', authenticate, getPublishProjects)

// Get All Pending Projects
router.get('/pending', authenticate, getPendingProjects)

// Search Projects
router.get('/search?q=', authenticate, searchProjects)

// Get Single Project
router.get('/:id', authenticate, getSingleProject)

// Update project Router
router.put(
    '/update/:id', 
    authenticate,
    upload.fields([
        {
            name: 'thmbImg',
            maxCount: 1
        },
        {
            name: 'ssImg'
        }
    ]),
    updateProjectValidator, 
    updateProject
)

// Delete project
router.delete('/delete/:id', authenticate, deleteProject)

module.exports = router