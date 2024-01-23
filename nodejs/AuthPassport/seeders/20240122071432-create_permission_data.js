"use strict";

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
    const data = [
      {
        value: "users.read",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "users.add",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "users.edit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "users.delete",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("permissions", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
