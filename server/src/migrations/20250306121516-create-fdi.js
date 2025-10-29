'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FDIs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pedido: {
        type: Sequelize.STRING(500)
      },
      empresa_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Empresas', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Statuses', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      detalhamento: {
        type: Sequelize.STRING(500)
      },
      valor_investimento: {
        type: Sequelize.INTEGER
      },
      qtde_empregos: {
        type: Sequelize.INTEGER
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Cidades', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
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
    await queryInterface.dropTable('FDIs');
  }
};