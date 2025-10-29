'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reportar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reportar.belongsTo(models.Compromisso, { foreignKey: 'compromisso_id', as: 'ass_report_commitment' });
    }
  }
  Reportar.init({
    situacao: DataTypes.STRING(5000)
  }, {
    sequelize,
    modelName: 'Reportar',
  });
  return Reportar;
};