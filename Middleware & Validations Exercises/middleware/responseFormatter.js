module.exports = function formatResponse(req, res, next) {
    res.ok = (data) => res.json({ success: true, data });

    res.fail = (status, message, details = null) =>
        res.status(status).json({ success: false, message, details });

    next();
};