'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Responsabilidade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Responsabilidade.belongsToMany(models.Projeto, { through: 'Users_Projects', as: 'ass_project_responsability' });
      Responsabilidade.hasMany(models.Users_Projects, { foreignKey: 'ResponsabilidadeId', as: 'ass_resp' });            
    }
  }
  Responsabilidade.init({
    tipo_responsabilidade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Responsabilidade',
  });
  return Responsabilidade;
};