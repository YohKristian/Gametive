'use strict';
const fs = require("fs");

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
    let locations = JSON.parse(fs.readFileSync("./data/locations.json", "utf-8"));
    locations.forEach(x => {
      x.createdAt = new Date();
      x.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Locations", locations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Locations", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
