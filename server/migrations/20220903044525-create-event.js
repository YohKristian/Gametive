'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
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
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rules: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      eventStatus: {
        defaultValue: "Pending",
        type: Sequelize.STRING,
      },
      eventPoster: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      eventDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      eventType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      GameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
          key: 'id'
        },
      },
      LocationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id'
        },
      },
      Bracket: {
        allowNull: true,
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Events');
  }
};