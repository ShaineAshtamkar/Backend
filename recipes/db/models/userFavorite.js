'use strict';

module.exports = (sequelize, DataTypes) => {
    const UserFavorite = sequelize.define('UserFavorite', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        recipeId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        tableName: 'UserFavorites',
        timestamps: true
    });

    return UserFavorite;
};