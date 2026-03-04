const express = require("express")
const router = express.Router()

const { getHome, getAbout } = require("../controllers/pagesController")

const validateId = require("../middleware/validateId")
const { checkResourceExists, checkPostExists } = require("../middleware/checkResourceExists")
const { getUsers, getUserById, createUser } = require("../controllers/usersController")

const { ajvPostValidator } = require("../middleware/validatePostsAJV");
const { validatePostId, validateCommentBody } = require("../middleware/validateComments");

const { createPost, getAllPosts } = require("../models/postsModel");
const { addComment, getComments } = require("../models/commentsModel");

router.get("/", getHome)
router.get("/about", getAbout)

router.get("/users", getUsers)
router.get("/users/:id", validateId, checkResourceExists, getUserById)
router.post("/users", createUser)


router.get("/posts", (req, res) => {
    res.ok(getAllPosts());
});

router.post("/posts", ajvPostValidator, (req, res) => {
    const post = createPost(req.body);
    res.status(201).ok(post);
});

router.post("/posts/:postId/comments", validatePostId, checkPostExists, validateCommentBody, (req, res) => {
    const comment = addComment(req.params.postId, req.body);
    res.status(201).ok(comment);
});

router.get("/posts/:postId/comments", validatePostId, (req, res) => {
    res.ok(getComments(req.params.postId));
});

module.exports = router