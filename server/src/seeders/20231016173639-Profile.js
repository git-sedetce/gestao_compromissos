'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Profiles', [
    {
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Secretario',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Coordenador',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Colaborador',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Parceiro',
      createdAt: new Date(),
      updatedAt: new Date()
     },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Profiles', null, {});
  }
};
