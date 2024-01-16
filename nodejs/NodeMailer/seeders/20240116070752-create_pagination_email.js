"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
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
    const data = [];
    for (let i = 0; i < 20; i++) {
      const seedData = {
        id: faker.string.uuid(),
        send_to: faker.internet.email(),
        title: faker.person.jobTitle(),
        message: faker.lorem.paragraphs({ min: 1, max: 3 }),
        status: faker.datatype.boolean(),
      };
      data.push(seedData);
    }
    await queryInterface.bulkInsert("histories", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
