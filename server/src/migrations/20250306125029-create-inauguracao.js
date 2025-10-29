'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inauguracaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.STRING
      },
      empresa_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Empresas', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Cidades', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      data_inauguracao: {
        type: Sequelize.DATEONLY
      },
      valor: {
        type: Sequelize.INTEGER
      },
      qtde_empregos: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Inauguracaos');
  }
};