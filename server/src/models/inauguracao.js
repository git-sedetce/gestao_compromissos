'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inauguracao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inauguracao.belongsTo(models.Empresa, { foreignKey: 'empresa_id', as: 'ass_inauguracao_empresa'});
      Inauguracao.belongsTo(models.Cidade, { foreignKey: 'city_id', as: 'ass_inauguracao_city' })
    }
  }
  Inauguracao.init({
    tipo: DataTypes.STRING,
    data_inauguracao: DataTypes.DATEONLY,
    valor: DataTypes.INTEGER,
    qtde_empregos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inauguracao',
  });
  return Inauguracao;
};