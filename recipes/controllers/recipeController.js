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

module.exports = {
    getAllRecipes,
};