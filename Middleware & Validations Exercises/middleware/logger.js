const logger = (req, res, next) => {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`)
    next()
}

const responseLogger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const ms = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${res.statusCode} (${ms}ms)`);
    });

    next();
};

module.exports = { logger, responseLogger }