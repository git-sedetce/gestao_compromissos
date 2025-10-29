'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Empresa.hasMany(models.Atracao, { foreignKey: 'empresa_id', as: 'ass_empresa_atracao'});
      Empresa.hasMany(models.FDI, { foreignKey: 'empresa_id', as: 'ass_empresa_fdi'});
      Empresa.hasMany(models.Inauguracao, { foreignKey: 'empresa_id', as: 'ass_empresa_inauguracao'});
      Empresa.belongsTo(models.CidadesBr, { foreignKey: 'city_id', as: 'ass_empresa_cidadebr' })
    }
  }
  Empresa.init({
    cnpj: DataTypes.STRING,
    razao_social: DataTypes.STRING,
    nome_fantasia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Empresa',
  });
  return Empresa;
};