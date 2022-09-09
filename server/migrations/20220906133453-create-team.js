'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CaptainName: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username'
        },
      },
      MemberName1: {
        allowNull: true,
        type: Sequelize.STRING
      },
      MemberName2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      MemberName3: {
        allowNull: true,
        type: Sequelize.STRING
      },
      MemberName4: {
        allowNull: true,
        type: Sequelize.STRING
      },
      BenchMemberName1: {
        allowNull: true,
        type: Sequelize.STRING
      },
      BenchMemberName2: {
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
    await queryInterface.dropTable('Teams');
  }
};