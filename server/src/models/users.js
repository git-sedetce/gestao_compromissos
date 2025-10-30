'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // Users.hasMany(models.Projeto, { foreignKey: 'responsavel_id', as: 'ass_project_resp' });
      // // Users.hasMany(models.Projeto, { foreignKey: 'criadoPor_id', as: 'ass_project_create' });
      // // Users.hasMany(models.Projeto, { foreignKey: 'coordenacao_id', as: 'ass_project_coord' });
      // // Users.hasMany(models.Projeto, { foreignKey: 'gerente_id', as: 'ass_project_gerenc' });
      Users.hasMany(models.Sub_Tarefa, { foreignKey: 'responsavel_id', as: 'ass_users_sub_task' });
      Users.hasMany(models.Tarefa, { foreignKey: 'responsavel_id', as: 'ass_users_task' });
      // Users.hasMany(models.Users_Projects, { foreignKey: 'UserId', as: 'ass_users' });
      Users.hasMany(models.Compromisso, { foreignKey: 'responsavel_id', as: 'ass_users_commitment' });
      Users.belongsTo(models.Secretaria_Executivas, { foreignKey: 'sexec_id', as: 'ass_users_sexec' });
      Users.belongsTo(models.Coordenadorias, { foreignKey: 'coord_id', as: 'ass_users_coord' });
      Users.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'ass_users_perfil' });
      Users.hasMany(models.Audit, { foreignKey: 'user_id', as: 'ass_users_audit' });      
      

    }
  }
  Users.init({
    name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_active: DataTypes.BOOLEAN,
    user_password: DataTypes.STRING,
    user_pin: DataTypes.STRING    
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};