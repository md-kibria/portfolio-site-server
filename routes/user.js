// External Imports
const router = require('express').Router()

// Internal Imports
const upload = require('../utils/upload')
const {addUserValidator, addUserValidatorHandler} = require('../utils/validators/addUser-validator')
const {loginValidator, loginValidatorHandler} = require('../utils/validators/login-validator')
const {changePassValidator, changePassValidatorHandler} = require('../utils/validators/changePass-validator')
const { registerUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser, changePass } = require('../controllers/user')
const authenticate = require('../utils/authenticate')


// Register User Route
router.post('/signup', upload.single('img'), addUserValidator, addUserValidatorHandler, registerUser)

// Login User Route
router.post('/login', loginValidator, loginValidatorHandler, loginUser)

// Update User Route
router.put('/update/:id', authenticate, upload.single('img'), updateUser)

// Get All User Route
router.get('/', authenticate, getAllUsers)

// Get Single User Route
router.get('/:id', authenticate, getSingleUser)

// Delete User Router
router.delete('/delete/:id', authenticate, deleteUser)

// Change Password Router
router.put('/changepass', authenticate, changePassValidator, changePassValidatorHandler, changePass)


module.exports = router