// External Imports
const createHttpError = require("http-errors")

module.exports = (req, res, next) => {
    throw createHttpError("This route breaked by developer!")
}