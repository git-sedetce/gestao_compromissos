'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atracao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Atracao.belongsTo(models.Status, { foreignKey: 'status_id', as: 'ass_atracao_status'});
      Atracao.belongsTo(models.Empresa, { foreignKey: 'empresa_id', as: 'ass_atracao_empresa'});
      Atracao.belongsTo(models.Cidade, { foreignKey: 'city_id', as: 'ass_atracao_city' })
    }
  }
  Atracao.init({
    detalhamento: DataTypes.STRING(500),
    mou: DataTypes.BOOLEAN,
    contato: DataTypes.STRING,
    email_contato: DataTypes.STRING,
    fone_contato: DataTypes.STRING,
    data_inicio: DataTypes.DATEONLY,
    descricao: DataTypes.STRING(500),
    valor_investimento: DataTypes.INTEGER,
    qtde_empregos: DataTypes.INTEGER,
    tem_fdi: DataTypes.BOOLEAN,
    proximo_passo: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'Atracao',
  });
  return Atracao;
};