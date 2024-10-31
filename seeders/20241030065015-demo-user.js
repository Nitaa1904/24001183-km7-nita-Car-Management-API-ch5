const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push({name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(), // Remember to hash passwords before using in production
        phone: faker.phone.number('+62 ###########'), // Indonesian phone format example
        alamat: faker.address.streetAddress(true),
        role: faker.helpers.arrayElement(['user', 'admin']),
        foto_profil: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};