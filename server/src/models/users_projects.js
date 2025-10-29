'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users_Projects.belongsTo(models.Projeto, { foreignKey: 'ProjetoId', as: 'ass_project_members' });
      Users_Projects.belongsTo(models.Users, { foreignKey: 'UserId', as: 'ass_project_users' });
      Users_Projects.belongsTo(models.Responsabilidade, { foreignKey: 'ResponsabilidadeId', as: 'ass_project_resp' });     

    }
  }
  Users_Projects.init({
    st_partic: DataTypes.STRING(5),
   
    
  }, {
    sequelize,
    modelName: 'Users_Projects',
  });
  return Users_Projects;
};