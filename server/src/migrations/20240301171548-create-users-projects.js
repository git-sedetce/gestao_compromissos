'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users_Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      ProjetoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Projetos', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      ResponsabilidadeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Responsabilidades', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      st_partic: {
        type: Sequelize.STRING(5)
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
    await queryInterface.dropTable('Users_Projects');
  }
};