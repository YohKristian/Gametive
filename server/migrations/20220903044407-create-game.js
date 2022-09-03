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
        type: Sequelize.STRING
      },
      gameImg: {
        type: Sequelize.TEXT
      },
      youtubeUrl: {
        type: Sequelize.TEXT
      },
      gameUrl: {
        type: Sequelize.TEXT
      },
      releaseDate: {
        type: Sequelize.DATE
      },
      developer: {
        type: Sequelize.STRING
      },
      genre: {
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