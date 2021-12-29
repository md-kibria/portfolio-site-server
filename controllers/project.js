// External Imports
const path = require('path')
const fs = require('fs')

// Internal Imports
const Project = require('../models/Project')
const arrToStr = require('../utils/arrToStr')
const notFound = require('../utils/notFound')

// Create Project Controller
const createProject = async (req, res, next) => {
    // Get data from requrest body
    const {
        title,
        tools,
        tags,
        liveLink,
        githubLink,
        description,
        status
    } = req.body

    // Conver tools text to string
    let toolsArr = arrToStr(tools)

    // Conver tags text to string
    let tagsArr = arrToStr(tags)

    // Thumbnail image
    let thmbImg = req.files.thmbImg[0].filename

    // Screensort images
    let ssImg = []

    // Push all images to ssImg array
    for (let i = 0; i < req.files.ssImg.length; i++) {
        ssImg.push(req.files.ssImg[i].filename)
    }


    // Create project class
    const newProject = new Project({
        title,
        thumbnail: thmbImg,
        tools: toolsArr,
        tags: tagsArr,
        liveLink,
        githubLink,
        screenshot: ssImg,
        description,
        status,
        author: req.user._id
    })

    try {
        // Create project
        let project = await newProject.save()

        // Response to client
        res.status(201).json({
            msg: "Project create successfully",
            project
        })
    } catch (error) {
        next(error)
    }
}

// Get All Projects
const getAllProjects = async (req, res, next) => {
    try {
        // Get all project from db
        const projects = await Project.find().select({
            __v: 0
        })

        if (projects.length !== 0) {
            // If projects found, response to client
            res.status(200).json({
                msg: "All projects",
                total: projects.length,
                projects
            })
        } else {
            // If projects not found
            notFound(res, "Projects not found")
        }
    } catch (error) {
        next(error)
    }
}

// Get Single Project
const getSingleProject = async (req, res, next) => {
    // Get project id from rquest params
    const { id } = req.params

    try {
        // Find the project 
        const project = await Project.findById(id).select({
            __v: 0
        })

        // If project exist
        if (project) {
            // Response to client
            res.status(200).json({
                msg: "Single project",
                project
            })
        } else {
            // If project not exist, response to client
            notFound(res, "Project not found")
        }

    } catch (error) {
        next(error)
    }
}

// Get Publish Projects
const getPublishProjects = async (req, res, next) => {
    try {
        // Find Projects
        const project = new Project()
        const data = await project.findPublish().select({ __v: 0 })

        if (data) {
            // If projects find, response to client
            res.status(200).json({
                msg: 'All publish projects',
                total: data.length,
                projects: data
            })
        } else {
            // If projects not found, respons to client
            notFound(res, "No publish project found")
        }

    } catch (error) {
        next(err)
    }
}

// Get Pending Projects
const getPendingProjects = async (req, res, next) => {
    try {
        // Find pending projects
        const project = new Project()
        const data = await project.findPending()

        console.log(data)
        if (data.length !== 0) {
            // If projects find, response to client
            res.status(200).json({
                msg: 'All pending projects',
                total: data.length,
                projects: data
            })
        } else {
            // If project not found, response to client
            notFound(res, 'Pending projects not found')
        }
    } catch (error) {
        next(err)
    }
}

// Search projects
const searchProjects = async (req, res, next) => {
    // Search query
    const { q } = req.query

    try {
        // Find by js
        const data = await Project.searchProjects(q)

        if (data.length !== 0) {
            // Response to client, search result
            res.status(200).json({
                msg: `Search result for "${q}"`,
                total: data.length,
                data
            })
        } else {
            // If no search result
            notFound(res, 'No result found')
        }
    } catch (error) {
        next(error)
    }
}

// Search by <something>
const searchBy = async (req, res, next) => {
    try {
        // Search By
        const data = await Project.find().searchBy('title')

        if (data.length !== 0) {
            res.status(200).json({
                msg: "Sarch resutl",
                total: data.length,
                data
            })
        } else {
            notFound(res, "Not found")
        }
    } catch (error) {
        next(errot)
    }
}

// Update Project Controller
const updateProject = async (req, res, next) => {

    // Get project id
    const { id } = req.params

    try {
        // Check is project exist
        const project = await Project.findById(id)

        // If project exist
        if (project) {
            // Get data from request body
            const {
                title,
                tools,
                tags,
                liveLink,
                githubLink,
                description,
                status
            } = req.body

            // Tools arr
            let toolsArr = arrToStr(tools)

            // Tags arr
            let tagsArr = arrToStr(tags)

            // Thumbnail image And Screenshots
            let thmbImg = ''
            let ssImg = ''

            // If files exist with request
            if (req.files) {
                // If thmbImg exist
                if (req.files.thmbImg) {
                    // Set the thmbImg
                    thmbImg = req.files.thmbImg[0].filename

                    // Delete the old thmbImg
                    fs.unlink(path.join(__dirname, `/../public/uploads/${project.thumbnail}`), (err) => {
                        if (err) {
                            next(err)
                        }
                    })
                }

                // If screenshot exist
                if (req.files.ssImg) {
                    let tempArr = []
                    for (let i = 0; i < req.files.ssImg.length; i++) {
                        tempArr.push(req.files.ssImg[i].filename)
                    }
                    // Set ss arr to ssImg
                    ssImg = tempArr

                    // Delete previous ss images
                    for (let i = 0; i < project.screenshot.length; i++) {
                        fs.unlink(path.join(__dirname, `/../public/uploads/${project.screenshot[i]}`), (err) => {
                            if (err) {
                                next(err)
                            }
                        })
                    }
                }
            }

            // Defind update project
            const updateProject = {
                title: title || project.title,
                tools: tools ? toolsArr : project.tools,
                tags: tags ? tagsArr : project.tags,
                liveLink: liveLink || project.liveLink,
                githubLink: githubLink || project.githubLink,
                description: description || project.description,
                status: status || project.status,
                thumbnail: thmbImg || project.thumbnail,
                screenshot: ssImg || project.screenshot
            }

            // Update the project
            const updatedProject = await Project.findByIdAndUpdate(id, { $set: updateProject }, { new: true })

            // Response to client
            res.status(201).json({
                msg: "Project updated successfully",
                project: updatedProject
            })

        } else {
            // If project not exist, response to client
            notFound(res, 'Project not found for update')
        }
    } catch (error) {
        next(error)
    }

}

// Delete Project Controller
const deleteProject = async (req, res, next) => {

    // Get id from request params
    const { id } = req.params

    try {
        // Find project of this id
        const project = await Project.findById(id)

        // If project exist
        if (project) {
            // Delete thumbnail image
            fs.unlink(path.join(__dirname, `/../public/uploads/${project.thumbnail}`), (err) => {
                if (err) {
                    next(err)
                }
            })

            // Delete screenshot images
            for (let i = 0; i < project.screenshot.length; i++) {
                fs.unlink(path.join(__dirname, `/../public/uploads/${project.screenshot[i]}`), (err) => {
                    if (err) {
                        next(err)
                    }
                })
            }


            // Delete the project from db
            const deletedProject = await Project.findByIdAndDelete(id)

            // Response to client
            res.status(200).json({
                msg: "Project deleted successfully",
                project: deletedProject
            })

        } else {
            // If project not exist, response to client
            notFound(res, "Project not found for delete")
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createProject,
    getAllProjects,
    getSingleProject,
    getPublishProjects,
    getPendingProjects,
    updateProject,
    deleteProject,
    searchProjects
}