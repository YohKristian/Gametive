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
    let events = JSON.parse(fs.readFileSync("./data/events.json", "utf-8"));
    events.forEach(x => {
      x.createdAt = new Date();
      x.updatedAt = new Date();
      x.Bracket = JSON.stringify(JSON.parse(fs.readFileSync(`./template/${x.size}slot.json`, "utf-8")));
    });
    await queryInterface.bulkInsert("Events", events, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
