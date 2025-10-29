'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      user_email: {
        type: Sequelize.STRING
      },
      user_active: {
        type: Sequelize.BOOLEAN
      },
      user_password: {
        type: Sequelize.STRING
      },
      user_pin: {
        type: Sequelize.STRING
      },
      profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Profiles', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
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
      // coordenadoria_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,        
      //   references: { model: 'Coordenadorias', key: 'id' },
      //   onDelete: "Cascade",
      //   onUpdate: "Cascade"
      // },
      // sexec_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: 'Secretaria_Executivas', key: 'id' },
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
    await queryInterface.dropTable('Users');
  }
};