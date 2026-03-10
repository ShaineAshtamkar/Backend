const express = require("express");
const authMiddleware = require('../middleware/authMiddleware');


// const { getAllRecipes,
//     getRecipeById,
//     getRecipeStats,
//     createRecipe,
//     updateRecipe,
//     deleteRecipe
// } = require("../controllers/recipeController");

const {
    createRecipe,
    getMyRecipes,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');
const router = express.Router();


const validateRecipe = require("../middleware/validateRecipe");


// router.get("/", getAllRecipes);
// router.get("/stats", getRecipeStats);
// router.get("/:id", getRecipeById);

// router.post("/", validateRecipe, createRecipe);
// router.put("/:id", validateRecipe, updateRecipe);
// router.delete("/:id", deleteRecipe);

router.post('/', authMiddleware, createRecipe);
router.get('/my-recipes', authMiddleware, getMyRecipes);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);



module.exports = router;