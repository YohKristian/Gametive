'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gameImg: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      youtubeUrl: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      gameUrl: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      releaseDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      developer: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      genre: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  }
};