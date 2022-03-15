// External Imports
const path = require('path')
const fs = require('fs')

// Internal Imports
const SiteInfo = require('../models/SiteInfo')
const notFound = require('../utils/notFound')

// Create Site Info
const createSiteInfo = async (req, res, next) => {
    // Get data from request body
    const { copyright, socialLinks, aboutText, heroTitle1, heroTitle2, heroDesc } = req.body

    let logo = ''
    let footerLogo = ''
    let fav = ''
    let heroImg = 'default.jpg'
    let aboutImg = 'default.jpg'

    // If request with file
    if (req.files) {
        // If logo
        if (req.files.logo) {
            logo = req.files.logo[0].filename
        }

        // If footer logo
        if (req.files.footerLogo) {
            logo = req.files.footerLogo[0].filename
        }

        // If fav
        if (req.files.fav) {
            fav = req.files.fav[0].filename
        }

        // If about image
        if (req.files.aboutImg) {
            aboutImg = req.files.aboutImg[0].filename
        }

        // If hero image
        if (req.files.heroImg) {
            heroImg = req.files.heroImg[0].filename
        }
    }

    try {
        // New site info
        const newSiteInfo = new SiteInfo({
            logo,
            footerLogo,
            fav,
            copyright,
            socialLinks: socialLinks || {},
            aboutText,
            aboutImg,
            heroTitle1,
            heroTitle2,
            heroDesc,
            heroImg
        })

        // Save
        const siteInfo = await newSiteInfo.save()

        // Response to client
        res.status(201).json({
            msg: "Site Info created successfully",
            siteInfo
        })
    } catch (error) {
        next(error)
    }
}

// Update Site Info
const updateSiteInfo = async (req, res, next) => {
    // Get if from request params
    const { id } = req.params

    try {
        // Try to find site info
        const oldSiteInfo = await SiteInfo.findById(id)

        // Site info found
        if (oldSiteInfo) {
            // Get data from request body
            const { copyright, socialLinks, aboutText, heroTitle1, heroTitle2, heroDesc } = req.body

            let logo = ''
            let fav = ''
            let footerLogo = ''
            let aboutImg = ''
            let heroImg = ''
            let resume = ''

            // If request with file
            if (req.files) {
                // If logo
                if (req.files.logo) {
                    // Set logo
                    logo = req.files.logo[0].filename

                    // Delete the previous
                    fs.unlink(path.join(__dirname, `/../public/uploads/${oldSiteInfo.logo}`), (err) => {
                        if (err) console.log(err)
                    })

                }

                // If logo
                if (req.files.footerLogo) {
                    // Set logo
                    footerLogo = req.files.footerLogo[0].filename

                    // Delete the previous
                    fs.unlink(path.join(__dirname, `/../public/uploads/${oldSiteInfo.footerLogo}`), (err) => {
                        if (err) console.log(err)
                    })

                }

                // If fav
                if (req.files.fav) {
                    // Set fav
                    fav = req.files.fav[0].filename

                    // Delete the previous
                    fs.unlink(path.join(__dirname, `/../public/uploads/${oldSiteInfo.fav}`), (err) => {
                        if (err) console.log(err)
                    })
                }

                // If about image
                if (req.files.aboutImg) {
                    // Set aboutImg
                    aboutImg = req.files.aboutImg[0].filename

                    // Delete the previous
                    fs.unlink(path.join(__dirname, `/../public/uploads/${oldSiteInfo.aboutImg}`), (err) => {
                        if (err) console.log(err)
                    })
                }

                // If hero image
                if (req.files.heroImg) {
                    // Set heroImg
                    heroImg = req.files.heroImg[0].filename

                    // Delete the previous
                    fs.unlink(path.join(__dirname, `/../public/uploads/${oldSiteInfo.heroImg}`), (err) => {
                        if (err) console.log(err)
                    })
                }

                // If resume 
                if(req.files.resume) {
                    // set resume
                    resume = req.files.resume[0].filename

                    // delete the previous
                    fs.unlink(path.join(__dirname, `/../public/uploads/${oldSiteInfo.resume}`), err => {
                        if(err) console.log(err)
                    })
                }
            }

            // Updated site info object
            const newUpdateSiteInfo = {
                logo: logo || oldSiteInfo.logo,
                footerLogo: footerLogo || oldSiteInfo.footerLogo,
                fav: fav || oldSiteInfo.fav,
                copyright: copyright || oldSiteInfo.copyright,
                socialLinks: socialLinks || oldSiteInfo.socialLinks,
                aboutText: aboutText || oldSiteInfo.aboutText,
                aboutImg: aboutImg || oldSiteInfo.aboutImg,
                heroTitle1: heroTitle1 || oldSiteInfo.heroTitle1,
                heroTitle2: heroTitle2 || oldSiteInfo.heroTitle2,
                heroDesc: heroDesc || oldSiteInfo.heroDesc,
                heroImg: heroImg || oldSiteInfo.heroImg,
                resume: resume || oldSiteInfo.resume
            }

            // Update the site info
           
            const updatedSiteInfo = await SiteInfo.findByIdAndUpdate(id, { $set: newUpdateSiteInfo }, { new: true })

            // Response to client
            res.status(201).json({
                msg: "Site info updated successfylly",
                siteInfo: updatedSiteInfo
            })

        } else {
            // If site info not found

            // Delete files 
            if (req.files) {
                // If logo
                if (req.files.logo) {
                    fs.unlink(path.join(__dirname, `/../public/uploads/${req.files.logo[0].filename}`), (err) => {
                        if (err) console.log(err)
                    })
                }

                // If fav
                if (req.files.fav) {
                    fs.unlink(path.join(__dirname, `/../public/uploads/${req.files.fav[0].filename}`), (err) => {
                        if (err) console.log(err)
                    })
                }

                // If about image
                if (req.files.aboutImg) {
                    fs.unlink(path.join(__dirname, `/../public/uploads/${req.files.aboutImg[0].filename}`), (err) => {
                        if (err) console.log(err)
                    })
                }

                // If hero image
                if (req.files.heroImg) {
                    fs.unlink(path.join(__dirname, `/../public/uploads/${req.files.heroImg[0].filename}`), (err) => {
                        if (err) console.log(err)
                    })
                }
            }

            // Response to client
            notFound(res, "Site info not found for update")
        }
    } catch (error) {
        next(error)
    }
}

// Get Site Info
const getSiteInfo = async (req, res, next) => {
    try {
        // Get the site info
        const siteInfo = await SiteInfo.find().select({ __v: 0 })

        // If site info found
        if (siteInfo.length !== 0) {
            // Response to client
            res.status(200).json({
                msg: "Site info get successfully",
                siteInfo: siteInfo[0]
            })
        } else {
            // If site info not found
            notFound(res, "Site info not found")
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createSiteInfo,
    updateSiteInfo,
    getSiteInfo
}