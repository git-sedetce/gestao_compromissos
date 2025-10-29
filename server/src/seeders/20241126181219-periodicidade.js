'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Periodicidades', [
      {
        periodicidade: 'Diária',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        periodicidade: 'Semanal',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        periodicidade: 'Mensal',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        periodicidade: 'Anual',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        periodicidade: 'Sem periodicidade',
        createdAt: new Date(),
        updatedAt: new Date()
       },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Periodicidades', null, {});
  }
};
