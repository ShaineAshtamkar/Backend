const express = require("express");
const router = express.Router();
const { getAllRecipes,
    getRecipeById,
    getRecipeStats,
} = require("../controllers/recipeController");

router.get("/", getAllRecipes);
router.get("/stats", getRecipeStats);
router.get("/:id", getRecipeById);
module.exports = router;