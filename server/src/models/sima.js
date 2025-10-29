'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sima extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sima.belongsTo(models.Users, { foreignKey: 'responsavel_id', as: 'ass_sima_users' });
      Sima.belongsTo(models.Status, { foreignKey: 'status_id', as: 'ass_sima_status'});
    }
  }
  Sima.init({
    numero_programa: DataTypes.STRING,
    nome_entrega: DataTypes.STRING,
    meta: DataTypes.STRING,
    detalhamento: DataTypes.STRING(500),
    mapp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sima',
  });
  return Sima;
};