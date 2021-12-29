// External Imports
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')
const dotEnv = require('dotenv')

// Internal Imports
const skillRouter = require('./routes/skills')
const userRouter = require('./routes/user')
const projectRouter = require('./routes/project')
const contactRouter = require('./routes/contact')
const messageRouter = require('./routes/message')
const subscriberRuter = require('./routes/subscriber')
const siteInfoRouter = require('./routes/siteInfo')

// Define App
const app = express()

// DotEnv Configuration
dotEnv.config()

// Set template engine
app.set('view engine', 'pug')

// Static Folder
app.use(express.static('public'))

// Define The PORT
const PORT = process.env.PORT || 8080

// Use Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Authenticate With Passport Jwt
app.use(passport.initialize())
require('./utils/passport')(passport)

/* Routes */
// Skill Route
app.use('/skills', skillRouter)

// User Route
app.use('/users', userRouter)

// Project Route
app.use('/projects', projectRouter)

// Contact Info Route
app.use('/contact', contactRouter)

// Message Route
app.use('/messages', messageRouter)

// Subscriber Route
app.use('/subs', subscriberRuter)

// Site Info Route
app.use('/siteinfo', siteInfoRouter)


// Root Route
app.get('/', (req, res) => {
    res.locals = {
        // Set Local Variable
        protocol: req.protocol,
        host: req.hostname,
        port: PORT
    }
    res.render('index', {title: "Site Map"})
})


// 404 Error Hanle
app.use((req, res, next) => {
    res.status(404).json({
        errors: {
            common: {
                msg: 'Not found!'
            }
        }
    })
})

// Error Handle
app.use((err, req, res, next) => {
    console.log(err)
    if (res.headerSend) {
        next('There was a problem!')
    } else {
        if (err.message) {
            res.status(500).json({
                errors: {
                    common: {
                        msg: err.message
                    }
                }
            })
        } else {
            res.status(500).json({
                errors: {
                    common: {
                        msg: 'There was a problem!'
                    }
                }
            })
        }
    }
})


// Create Database Connection
mongoose.connect(
    'mongodb://localhost:27017/portfolio',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('Database is connected...')
    }
)

// Create Server Connection
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})