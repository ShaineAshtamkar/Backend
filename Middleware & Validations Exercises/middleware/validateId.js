const validateId = (req, res, next) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        const err = new Error("Invalid ID format - id must be a number")
        err.status = 400

        return next(err)
    }
    req.userId = id
    next()
}

module.exports = validateId