const { readRecipesFromFile, writeRecipesToFile } = require("../helpers/fileHelper");
const { v4: uuidv4 } = require("uuid");


// const getAllRecipes = async (req, res, next) => {
//     try {
//         let recipes = await readRecipesFromFile();

//         const { difficulty, maxCookingTime, search } = req.query;

//         if (difficulty) {
//             recipes = recipes.filter(
//                 (recipe) => recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
//             );
//         }

//         if (maxCookingTime) {
//             const maxTime = Number(maxCookingTime);

//             if (!Number.isNaN(maxTime)) {
//                 recipes = recipes.filter((recipe) => recipe.cookingTime <= maxTime);
//             }
//         }

//         if (search) {
//             const searchTerm = search.toLowerCase();

//             recipes = recipes.filter(
//                 (recipe) =>
//                     recipe.title.toLowerCase().includes(searchTerm) ||
//                     recipe.description.toLowerCase().includes(searchTerm)
//             );
//         }

//         res.status(200).json({
//             error: false,
//             count: recipes.length,
//             data: recipes,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// const getRecipeById = async (req, res, next) => {
//     try {
//         const recipes = await readRecipesFromFile();
//         const { id } = req.params;

//         const recipe = recipes.find((recipe) => recipe.id === id);

//         if (!recipe) {
//             return res.status(404).json({
//                 error: true,
//                 message: "Recipe not found",
//                 statusCode: 404,
//             });
//         }

//         res.status(200).json({
//             error: false,
//             data: recipe,
//         });
//     } catch (error) {
//         next(error);
//     }
// };


// const getRecipeStats = async (req, res, next) => {
//     try {
//         const recipes = await readRecipesFromFile();

//         const totalRecipes = recipes.length;

//         const averageCookingTime =
//             totalRecipes === 0
//                 ? 0
//                 : recipes.reduce((sum, recipe) => sum + recipe.cookingTime, 0) / totalRecipes;

//         const recipesByDifficulty = {
//             easy: 0,
//             medium: 0,
//             hard: 0,
//         };

//         recipes.forEach((recipe) => {
//             if (recipesByDifficulty[recipe.difficulty] !== undefined) {
//                 recipesByDifficulty[recipe.difficulty] += 1;
//             }
//         });

//         const ingredientCounts = {};

//         recipes.forEach((recipe) => {
//             recipe.ingredients.forEach((ingredient) => {
//                 const normalizedIngredient = ingredient.toLowerCase();
//                 ingredientCounts[normalizedIngredient] =
//                     (ingredientCounts[normalizedIngredient] || 0) + 1;
//             });
//         });

//         const mostCommonIngredients = [];

//         for (const ingredient in ingredientCounts) {
//             mostCommonIngredients.push({
//                 ingredient: ingredient,
//                 count: ingredientCounts[ingredient],
//             });
//         }

//         mostCommonIngredients.sort((a, b) => b.count - a.count);

//         const topFiveIngredients = mostCommonIngredients.slice(0, 5);

//         res.status(200).json({
//             error: false,
//             data: {
//                 totalRecipes,
//                 averageCookingTime,
//                 recipesByDifficulty,
//                 topFiveIngredients,
//             },
//         });
//     } catch (error) {
//         next(error);
//     }
// };


// const createRecipe = async (req, res, next) => {
//     try {
//         const recipes = await readRecipesFromFile();

//         const newRecipe = {
//             id: uuidv4(),
//             ...req.body,
//             createdAt: new Date().toISOString(),
//         };

//         recipes.push(newRecipe);

//         await writeRecipesToFile(recipes);

//         res.status(201).json({
//             error: false,
//             data: newRecipe,
//         });
//     } catch (error) {
//         next(error);
//     }
// };


// const updateRecipe = async (req, res, next) => {
//     try {
//         const recipes = await readRecipesFromFile();
//         const { id } = req.params;

//         const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

//         if (recipeIndex === -1) {
//             return res.status(404).json({
//                 error: true,
//                 message: "Recipe not found",
//                 statusCode: 404,
//             });
//         }

//         const updatedRecipe = {
//             ...recipes[recipeIndex],
//             ...req.body,
//         };

//         recipes[recipeIndex] = updatedRecipe;

//         await writeRecipesToFile(recipes);

//         res.status(200).json({
//             error: false,
//             data: updatedRecipe,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// const deleteRecipe = async (req, res, next) => {
//     try {
//         const recipes = await readRecipesFromFile();
//         const { id } = req.params;

//         const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

//         if (recipeIndex === -1) {
//             return res.status(404).json({
//                 error: true,
//                 message: "Recipe not found",
//                 statusCode: 404,
//             });
//         }

//         recipes.splice(recipeIndex, 1);

//         await writeRecipesToFile(recipes);

//         res.status(204).send();
//     } catch (error) {
//         next(error);
//     }
// };


const { Recipe } = require('../db/models');
const fs = require('fs');

const createRecipe = async (req, res) => {
    try {
        const {
            title,
            description,
            ingredients,
            instructions,
            cookingTime,
            servings,
            difficulty,
            isPublic
        } = req.body;

        if (
            !title ||
            !ingredients ||
            !instructions ||
            !cookingTime ||
            !servings ||
            !difficulty
        ) {
            return res.status(400).json({
                success: false,
                message: 'Missing required recipe fields'
            });
        }

        const recipe = await Recipe.create({
            title,
            description,
            ingredients: typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients,
            instructions: typeof instructions === 'string' ? JSON.parse(instructions) : instructions,
            cookingTime,
            servings,
            difficulty,
            isPublic: isPublic !== undefined ? isPublic : true,
            userId: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: 'Recipe created successfully',
            recipe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll({
            where: { userId: req.user.userId },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            count: recipes.length,
            recipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        if (recipe.userId !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: 'You can only update your own recipes'
            });
        }

        const updatedData = { ...req.body };

        if (updatedData.ingredients && typeof updatedData.ingredients === 'string') {
            updatedData.ingredients = JSON.parse(updatedData.ingredients);
        }

        if (updatedData.ingredients && typeof updatedData.ingredients === 'string') {
            updatedData.ingredients = JSON.parse(updatedData.ingredients);
        }

        if (req.file) {
            updatedData.imageUrl = req.file.path;
        }

        await recipe.update(updatedData);

        res.status(200).json({
            success: true,
            message: 'Recipe updated successfully',
            recipe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        if (recipe.userId !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own recipes'
            });
        }

        await recipe.destroy();

        res.status(200).json({
            success: true,
            message: 'Recipe deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createRecipe,
    getMyRecipes,
    updateRecipe,
    deleteRecipe
};

// module.exports = {
//     getAllRecipes, getRecipeById, getRecipeStats, createRecipe, updateRecipe, deleteRecipe,

// };