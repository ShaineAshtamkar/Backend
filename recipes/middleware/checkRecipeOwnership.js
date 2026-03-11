const { Recipe } = require('../db/models');

const checkRecipeOwnership = async (req, res, next) => {
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
                message: 'You can only modify your own recipes'
            });
        }

        req.recipe = recipe;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = checkRecipeOwnership;