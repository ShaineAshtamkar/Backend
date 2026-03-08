const errorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            error: true,
            message: "Malformed JSON in request body",
            statusCode: 400,
        });
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        error: true,
        message,
        statusCode,
    });
};

module.exports = errorHandler;