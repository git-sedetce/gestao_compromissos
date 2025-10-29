'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CidadesBr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CidadesBr.belongsTo(models.EstadosBr, { foreignKey: 'estado_id', as: 'ass_cidadebr_estadobr' });
      CidadesBr.hasMany(models.Empresa, { foreignKey: 'city_id', as: 'ass_cidadebr_empresa' });
    }
  }
  CidadesBr.init({
    municipio: DataTypes.STRING,
    cod_ibge: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CidadesBr',
  });
  return CidadesBr;
};