"use strict";
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
    const participants = JSON.parse(
      fs.readFileSync("./data/participants.json", "utf-8")
    );
    participants.forEach(participant => {
      participant.paymentDate = new Date(),
      participant.createdAt = new Date(),
      participant.updatedAt = new Date()
    });
    await queryInterface.bulkInsert("Participants", participants, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Participants", null, {});
  },
};
