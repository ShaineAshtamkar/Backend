const { getUserById } = require("../models/usersModel")
const { findPostById } = require("../models/postsModel");



const checkResourceExists = (req, res, next) => {
    const user = getUserById(req.userId)

    if (!user) {
        const err = new Error("User not found")
        err.status = 404
        return next(err)
    }
    req.user = user
    next()
}

function checkPostExists(req, res, next) {
    const post = findPostById(req.params.postId);
    if (!post) return res.fail(404, "Post not found");
    next();
}




module.exports = { checkResourceExists, checkPostExists }