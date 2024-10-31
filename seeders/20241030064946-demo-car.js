'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cars', [
      {
        name: 'Toyota Avanza',
        images: 'url_gambar_toyota_avanza',
        stock: 10,
        price: 250000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Honda CR-V',
        images: 'url_gambar_honda_crv',
        stock: 5,
        price: 350000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Suzuki Ertiga',
        images: 'url_gambar_suzuki_ertiga',
        stock: 7,
        price: 220000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
