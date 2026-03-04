const { body, param, validationResult } = require("express-validator");

function checkErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.fail(400, "Comment validation failed", errors.array());
    next();
}

const validatePostId = [
    param("postId").isInt({ min: 1 }).withMessage("postId must be a number >= 1"),
    checkErrors,
];

const validateCommentBody = [
    body("content").isLength({ min: 5, max: 500 }).withMessage("content must be 5-500 chars"),
    body("email").isEmail().withMessage("email must be valid"),
    checkErrors,
];

module.exports = { validatePostId, validateCommentBody };

//param(...) / body(...) things are middleware functions, and they already call
// next() internally when they’re done.