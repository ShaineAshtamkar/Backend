'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ingredients: {
        type: Sequelize.JSON,
        allowNull: false
      },
      instructions: {
        type: Sequelize.JSON,
        allowNull: false
      },
      cookingTime: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      servings: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      difficulty: {
        type: Sequelize.ENUM('easy', 'medium', 'hard'),
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Recipes_difficulty";');
  }
};