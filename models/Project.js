// External Imports
const mongoose = require('mongoose')

// Project Schema
const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    tools: {
        type: [{
            type: String
        }]
    },
    tags: {
        type: [{
            type: String
        }]
    },
    liveLink: String,
    githubLink: String,
    screenshot: {
        type: [{
            type: String
        }],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['publish', 'pending'],
        default: 'publish'
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

// Instance Method
projectSchema.methods = {
    // Find publish projects
    findPublish: function () {
        return mongoose.model("Project").find({ status: 'publish' })
    },

    // Find pending projects
    findPending: function () {
        return mongoose.model('Project').find({ status: 'pending' }).select({ __v: 0 })
    }
}

// Static Method
projectSchema.statics = {
    // Search project
    searchProjects: function (q) {
        return this.find({title: new RegExp(q, 'i')})
    }
}

// Query Helper
// projectSchema.query = {
//     searchBy: function (q) {
//         return this.find({ title: new RegExp(q, 'i') })
//     }
// }

// Project Model
const Project = mongoose.model('Project', projectSchema)

module.exports = Project