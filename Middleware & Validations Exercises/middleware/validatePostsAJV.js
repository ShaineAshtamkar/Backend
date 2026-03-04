const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);


const postSchema = {
    type: "object",
    additionalProperties: false,
    required: ["title", "content", "tags"],
    properties: {
        title: { type: "string", minLength: 5, maxLength: 100 },
        content: { type: "string", minLength: 10, maxLength: 1000 },
        tags: { type: "array", items: { type: "string" } },
    },
};

const validatePost = ajv.compile(postSchema);

function ajvPostValidator(req, res, next) {
    const ok = validatePost(req.body);
    if (!ok) return res.fail(400, "Post validation failed", validatePost.errors);
    next();
}

module.exports = { ajvPostValidator };

