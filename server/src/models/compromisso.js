'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compromisso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Compromisso.belongsTo(models.Coordenadorias, { foreignKey: 'coord_id',  as: 'ass_commitment_coord'})
      Compromisso.belongsTo(models.Secretaria_Executivas, { foreignKey: 'sexec_id',  as: 'ass_commitment_sexec'})
      Compromisso.belongsTo(models.Users, { foreignKey: 'responsavel_id', as: 'ass_commitment_users' });
      Compromisso.belongsTo(models.Status, { foreignKey: 'status_id', as: 'ass_commitment_status'});      
      Compromisso.belongsTo(models.Reuniao, { foreignKey: 'reuniao_id', as: 'ass_commitment_meet' });
      Compromisso.hasMany(models.Reportar, { foreignKey: 'compromisso_id', as: 'ass_commitment_report' });
      // define association here
    }
  }
  Compromisso.init({
    compromisso: DataTypes.STRING(5000),
    data_inicial: DataTypes.DATEONLY,
    prazo: DataTypes.INTEGER,
    data_conclusao: DataTypes.DATEONLY,
    arquivo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Compromisso',
  });
  return Compromisso;
};