const { readRecipesFromFile } = require("../helpers/fileHelper");

const getAllRecipes = async (req, res, next) => {
    try {
        let recipes = await readRecipesFromFile();

        const { difficulty, maxCookingTime, search } = req.query;

        if (difficulty) {
            recipes = recipes.filter(
                (recipe) => recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
            );
        }

        if (maxCookingTime) {
            const maxTime = Number(maxCookingTime);

            if (!Number.isNaN(maxTime)) {
                recipes = recipes.filter((recipe) => recipe.cookingTime <= maxTime);
            }
        }

        if (search) {
            const searchTerm = search.toLowerCase();

            recipes = recipes.filter(
                (recipe) =>
                    recipe.title.toLowerCase().includes(searchTerm) ||
                    recipe.description.toLowerCase().includes(searchTerm)
            );
        }

        res.status(200).json({
            error: false,
            count: recipes.length,
            data: recipes,
        });
    } catch (error) {
        next(error);
    }
};

const getRecipeById = async (req, res, next) => {
    try {
        const recipes = await readRecipesFromFile();
        const { id } = req.params;

        const recipe = recipes.find((recipe) => recipe.id === id);

        if (!recipe) {
            return res.status(404).json({
                error: true,
                message: "Recipe not found",
                statusCode: 404,
            });
        }

        res.status(200).json({
            error: false,
            data: recipe,
        });
    } catch (error) {
        next(error);
    }
};


const getRecipeStats = async (req, res, next) => {
    try {
        const recipes = await readRecipesFromFile();

        const totalRecipes = recipes.length;

        const averageCookingTime =
            totalRecipes === 0
                ? 0
                : recipes.reduce((sum, recipe) => sum + recipe.cookingTime, 0) / totalRecipes;

        const recipesByDifficulty = {
            easy: 0,
            medium: 0,
            hard: 0,
        };

        recipes.forEach((recipe) => {
            if (recipesByDifficulty[recipe.difficulty] !== undefined) {
                recipesByDifficulty[recipe.difficulty] += 1;
            }
        });

        const ingredientCounts = {};

        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                const normalizedIngredient = ingredient.toLowerCase();
                ingredientCounts[normalizedIngredient] =
                    (ingredientCounts[normalizedIngredient] || 0) + 1;
            });
        });

        const mostCommonIngredients = [];

        for (const ingredient in ingredientCounts) {
            mostCommonIngredients.push({
                ingredient: ingredient,
                count: ingredientCounts[ingredient],
            });
        }

        mostCommonIngredients.sort((a, b) => b.count - a.count);

        const topFiveIngredients = mostCommonIngredients.slice(0, 5);

        res.status(200).json({
            error: false,
            data: {
                totalRecipes,
                averageCookingTime,
                recipesByDifficulty,
                topFiveIngredients,
            },
        });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getAllRecipes, getRecipeById, getRecipeStats,

};