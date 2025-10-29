'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FDI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FDI.belongsTo(models.Empresa, { foreignKey: 'empresa_id', as: 'ass_fdi_empresa'});
      FDI.belongsTo(models.Status, { foreignKey: 'status_id', as: 'ass_fdi_status'});
      FDI.belongsTo(models.Cidade, { foreignKey: 'city_id', as: 'ass_fdi_city' })
    }
  }
  FDI.init({
    pedido: DataTypes.STRING(500),
    detalhamento: DataTypes.STRING(500),
    valor_investimento: DataTypes.INTEGER,
    qtde_empregos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FDI',
  });
  return FDI;
};