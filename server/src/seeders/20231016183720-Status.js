'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Statuses', [
      {
       name: 'Não iniciado',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Em andamento',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Paralisado',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Concluído',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Arquivado',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Statuses', null, {});
  }
};
