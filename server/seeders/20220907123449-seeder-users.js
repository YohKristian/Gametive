'use strict';
const fs = require("fs");
const { hashPassword } = require('../helpers/bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    users.forEach(x => {
      x.createdAt = new Date();
      x.updatedAt = new Date();
      x.password = hashPassword(x.password)
    });
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  }
};
