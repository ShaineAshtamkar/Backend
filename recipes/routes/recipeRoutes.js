const express = require("express");
const router = express.Router();
const { getAllRecipes,
    getRecipeById,
    getRecipeStats,
    createRecipe,
    updateRecipe,
    deleteRecipe
} = require("../controllers/recipeController");

const validateRecipe = require("../middleware/validateRecipe");


router.get("/", getAllRecipes);
router.get("/stats", getRecipeStats);
router.get("/:id", getRecipeById);

router.post("/", validateRecipe, createRecipe);
router.put("/:id", validateRecipe, updateRecipe);
router.delete("/:id", deleteRecipe);


module.exports = router;