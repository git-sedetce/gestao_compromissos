'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Atracaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      mou: {
        type: Sequelize.BOOLEAN
      },
      contato: {
        type: Sequelize.STRING
      },
      email_contato: {
        type: Sequelize.STRING
      },
      fone_contato: {
        type: Sequelize.STRING
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Cidades', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      data_inicio: {
        type: Sequelize.DATEONLY
      },
      descricao: {
        type: Sequelize.STRING(500)
      },
      valor_investimento: {
        type: Sequelize.INTEGER
      },
      qtde_empregos: {
        type: Sequelize.INTEGER
      },
      tem_fdi: {
        type: Sequelize.BOOLEAN
      },
      proximo_passo: {
        type: Sequelize.STRING(500)
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
    await queryInterface.dropTable('atracaos');
  }
};