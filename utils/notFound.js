// Common Error Function
function notFound(res, msg, status) {
    res.status(status || 404).json({
        errors: {
            common: {
                msg: msg || "Not found"
            }
        }
    })
}

module.exports = notFound