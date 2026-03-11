const express = require("express");
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const checkRecipeOwnership = require('../middleware/checkRecipeOwnership');


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
const upload = multer({ dest: 'uploads/' });



const validateRecipe = require("../middleware/validateRecipe");


// router.get("/", getAllRecipes);
// router.get("/stats", getRecipeStats);
// router.get("/:id", getRecipeById);

// router.post("/", validateRecipe, createRecipe);
// router.put("/:id", validateRecipe, updateRecipe);
// router.delete("/:id", deleteRecipe);

router.post('/', authMiddleware, upload.single('image'), createRecipe);
router.get('/my-recipes', authMiddleware, getMyRecipes);
router.put('/:id', authMiddleware, checkRecipeOwnership, upload.single('image'), updateRecipe);
router.delete('/:id', authMiddleware, checkRecipeOwnership, deleteRecipe);




module.exports = router;