// External Inports
const router = require('express').Router()

// Internal Imports 
const authenticate = require('../utils/authenticate')
const upload = require('../utils/upload')
const breaker = require('../utils/breaker')
const {updateSiteInfoValidtor} = require('../utils/validators/updateSiteInfo-validator')
const { createSiteInfo, getSiteInfo, updateSiteInfo } = require('../controllers/siteInfo')

// Create Site Info
router.post(
    '/create',
    authenticate,
    breaker,
    upload.fields([
        {
            name: 'logo',
            maxCount: 1
        },
        {
            name: 'footerLogo',
            maxCount: 1
        },
        {
            name: 'fav',
            maxCount: 1
        },
        {
            name: 'heroImg',
            maxCount: 1
        },
        {
            name: 'aboutImg',
            maxCount: 1
        }
    ]),
    createSiteInfo
)

// Update Site Info
router.put(
    '/update/:id',
    authenticate,
    upload.fields([
        {
            name: 'logo',
            maxCount: 1
        },
        {
            name: 'footerLogo',
            maxCount: 1
        },
        {
            name: 'fav',
            maxCount: 1
        },
        {
            name: 'heroImg',
            maxCount: 1
        },
        {
            name: 'aboutImg',
            maxCount: 1
        }
    ]),
    updateSiteInfoValidtor,
    updateSiteInfo
)

// Get Site Info
router.get('/', getSiteInfo)

module.exports = router