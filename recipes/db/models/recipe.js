'use strict';

module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('Recipe', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ingredients: {
            type: DataTypes.JSON,
            allowNull: false
        },
        instructions: {
            type: DataTypes.JSON,
            allowNull: false
        },
        cookingTime: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        servings: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.ENUM('easy', 'medium', 'hard'),
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        tableName: 'Recipes',
        timestamps: true
    });

    Recipe.associate = models => {
        Recipe.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });

        Recipe.belongsToMany(models.User, {
            through: models.UserFavorite,
            foreignKey: 'recipeId',
            otherKey: 'userId',
            as: 'favoritedBy'
        });
    };

    return Recipe;
};