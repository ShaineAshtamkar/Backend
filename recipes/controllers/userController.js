const { UserFavorite, Recipe, User } = require('../db/models');

const addFavorite = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const userId = req.user.userId;

        const recipe = await Recipe.findByPk(recipeId);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        const existingFavorite = await UserFavorite.findOne({
            where: { userId, recipeId }
        });

        if (existingFavorite) {
            return res.status(400).json({
                success: false,
                message: 'Recipe already in favorites'
            });
        }

        const favorite = await UserFavorite.create({
            userId,
            recipeId
        });

        res.status(201).json({
            success: true,
            message: 'Recipe added to favorites',
            favorite
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const userId = req.user.userId;

        const favorite = await UserFavorite.findOne({
            where: { userId, recipeId }
        });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: 'Favorite not found'
            });
        }

        await favorite.destroy();

        res.status(200).json({
            success: true,
            message: 'Recipe removed from favorites'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getFavorites = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'firstName', 'lastName'],
            include: [
                {
                    model: Recipe,
                    as: 'favoriteRecipes',
                    through: { attributes: [] }
                }
            ]
        });

        res.status(200).json({
            success: true,
            count: user.favoriteRecipes.length,
            favorites: user.favoriteRecipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites
};