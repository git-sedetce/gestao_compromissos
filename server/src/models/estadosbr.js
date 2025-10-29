'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EstadosBr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EstadosBr.hasMany(models.CidadesBr, { foreignKey: 'estado_id', as: 'ass_estadobr_cidadebr' })
    }
  }
  EstadosBr.init({
    estado: DataTypes.STRING,
    cod_ibge: DataTypes.STRING,
    sigla: DataTypes.STRING(5),
    regiao: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'EstadosBr',
  });
  return EstadosBr;
};