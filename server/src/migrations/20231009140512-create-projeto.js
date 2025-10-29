'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projetos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING(5000)
      },
      // responsavel_id: {
      //   allowNull: false,
      //   type: Sequelize.INTEGER,
      //   references: { model: 'Users', key: 'id' },
      //   onDelete: "Cascade",
      //   onUpdate: "Cascade"
      // },
      // criadoPor_id: {
      //   allowNull: false,
      //   type: Sequelize.INTEGER,
      //   references: { model: 'Users', key: 'id' },
      //   onDelete: "Cascade",
      //   onUpdate: "Cascade"
      // },      
      data_inicio: {
        type: Sequelize.DATEONLY
      },
      previsao_conclusao: {
        type: Sequelize.DATEONLY
      },
      // coordenacao_id: {
      //   allowNull: false,
      //   type: Sequelize.INTEGER,
      //   references: { model: 'Users', key: 'id' },
      //   onDelete: "Cascade",
      //   onUpdate: "Cascade"
      // },
      coord_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Coordenadorias', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      sexec_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Secretaria_Executivas', key: 'id' },
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
      projeto_arquivado: {
        type: Sequelize.BOOLEAN
      },
      motivo_arquivado: {
        type: Sequelize.STRING
      },
      // gerente_id: {
      //   allowNull: false,
      //   type: Sequelize.INTEGER,
      //   references: { model: 'Users', key: 'id' },
      //   onDelete: "Cascade",
      //   onUpdate: "Cascade"
      // },
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
    await queryInterface.dropTable('Projetos');
  }
};