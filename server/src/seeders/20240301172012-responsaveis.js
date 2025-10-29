'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Responsabilidades', [
      
       {
        tipo_responsabilidade: 'Gerente',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        tipo_responsabilidade: 'Coordenador',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        tipo_responsabilidade: 'Membro',
        createdAt: new Date(),
        updatedAt: new Date()
       },
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Responsabilidades', null, {});
    
  }
};
