'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Simas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_programa: {
        type: Sequelize.STRING
      },
      nome_entrega: {
        type: Sequelize.STRING
      },
      meta: {
        type: Sequelize.STRING
      },
      responsavel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
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
      mapp: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Simas');
  }
};