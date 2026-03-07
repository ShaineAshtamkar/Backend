const express = require("express");
const router = express.Router();

// temporary placeholder route
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Get all recipes route works",
    });
});

module.exports = router;