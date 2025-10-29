"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Compromissos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      compromisso: {
        type: Sequelize.STRING(5000),
      },
      data_inicial: {
        type: Sequelize.DATEONLY,
      },
      prazo: {
        type: Sequelize.INTEGER,
      },
      data_conclusao: {
        type: Sequelize.DATEONLY,
      },
      responsavel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onDelete: "Cascade",
        onUpdate: "Cascade",
      },
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Statuses", key: "id" },
        onDelete: "Cascade",
        onUpdate: "Cascade",
      },
      reuniao_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: "Reuniaos", key: "id" },
        onDelete: "Cascade",
        onUpdate: "Cascade",
      },
      arquivo: {
        type: Sequelize.BOOLEAN,
      },
      coord_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Coordenadorias", key: "id" },
        onDelete: "Cascade",
        onUpdate: "Cascade",
      },
      sexec_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Secretaria_Executivas", key: "id" },
        onDelete: "Cascade",
        onUpdate: "Cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Compromissos");
  },
};
