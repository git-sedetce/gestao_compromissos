'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reuniaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_reuniao: {
        type: Sequelize.STRING
      },
      data_reuniao: {
        type: Sequelize.DATEONLY
      },
      horario_inicial: {
        type: Sequelize.STRING
      },
      duracao: {
        type: Sequelize.INTEGER
      },
      horario_final: {
        type: Sequelize.STRING
      },
      pauta: {
        type: Sequelize.STRING(5000)
      },
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
      periodicidade: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Periodicidades', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      ata_registrada: {
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
    await queryInterface.dropTable('Reuniaos');
  }
};