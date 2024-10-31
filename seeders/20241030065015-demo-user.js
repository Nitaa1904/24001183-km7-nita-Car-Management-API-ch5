'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Nita Fitrotul Mar\'ah',
        email: 'nita@example.com',
        password: 'hashed_password', // Pastikan ini adalah password yang sudah di-hash
        phone: '088239561942',
        alamat: 'Petarangan RT 01 RW 04 Kemranjen, Banyumas',
        role: 'admin',
        foto_profil: 'url_foto_profil_nita',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        phone: '08123456789',
        alamat: 'Somewhere in Indonesia',
        role: 'user',
        foto_profil: 'url_foto_profil_john',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
