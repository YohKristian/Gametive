'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        },
      },
      EventId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Events',
          key: 'id'
        },
      },
      statusPay: {
        defaultValue: "Unpaid",
        type: Sequelize.STRING
      },
      paymentDate: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Participants');
  }
};