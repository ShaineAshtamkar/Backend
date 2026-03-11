'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserFavorites', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      recipeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Recipes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },


    });

    await queryInterface.addConstraint('UserFavorites', {
      fields: ['userId', 'recipeId'],
      type: 'unique',
      name: 'unique_user_recipe_favorite'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserFavorites');
  }
};