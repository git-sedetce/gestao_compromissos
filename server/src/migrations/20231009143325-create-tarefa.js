'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tarefas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_ordem: {
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
      data_inicial: {
        type: Sequelize.DATEONLY
      },
      prazo: {
        type: Sequelize.INTEGER
      },
      data_conclusao: {
        type: Sequelize.DATEONLY
      },
      dias_trabalhado: {
        type: Sequelize.INTEGER
      },
      status_conclusao: {
        type: Sequelize.STRING
      },
      execucao: {
        type: Sequelize.INTEGER
      },
      tarefa_arquivada: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Tarefas');
  }
};