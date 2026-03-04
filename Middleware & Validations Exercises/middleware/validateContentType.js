const validateContentType = (req, res, next) => {
    if (req.method !== "POST" && req.method !== "PUT") return next();

    const ct = req.headers["content-type"] || "";
    if (!ct.includes("application/json")) return res.fail(415, "Send JSON (Content-Type: application/json)");

    next();
};

module.exports = { validateContentType };
