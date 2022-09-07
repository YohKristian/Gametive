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
    let games = JSON.parse(fs.readFileSync("./data/games.json", "utf-8"));
    games.forEach(x => {
      x.createdAt = new Date();
      x.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Games", games, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Games", null, {});
  }
};
