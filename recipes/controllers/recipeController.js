const { readRecipesFromFile } = require("../helpers/fileHelper");

const getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await readRecipesFromFile();

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