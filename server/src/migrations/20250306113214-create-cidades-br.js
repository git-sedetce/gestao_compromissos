'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CidadesBrs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      municipio: {
        type: Sequelize.STRING
      },
      cod_ibge: {
        type: Sequelize.STRING
      },
      estado_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'EstadosBrs', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CidadesBrs');
  }
};