'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reuniao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reuniao.belongsTo(models.Projeto, { foreignKey: 'projeto_id',  as: 'ass_meet_project'})
      Reuniao.belongsTo(models.Coordenadorias, { foreignKey: 'coord_id',  as: 'ass_meet_coord'})
      Reuniao.belongsTo(models.Secretaria_Executivas, { foreignKey: 'sexec_id',  as: 'ass_meet_sexec'})
      Reuniao.belongsTo(models.Periodicidade, { foreignKey: 'periodicidade',  as: 'ass_meet_periodicidade'})
      Reuniao.hasOne(models.Atas, { foreignKey: 'reuniao_id',  as: 'ass_meet_register' });
      Reuniao.hasMany(models.Compromisso, { foreignKey: 'reuniao_id', as: 'ass_meet_commitment' });
      Reuniao.hasMany(models.Tarefa, { foreignKey: 'reuniao_id', as: 'ass_meet_task' });
    }
  }
  Reuniao.init({
    nome_reuniao: DataTypes.STRING,
    data_reuniao: DataTypes.DATEONLY,
    horario_inicial: DataTypes.STRING,
    duracao: DataTypes.INTEGER,
    horario_final: DataTypes.STRING,
    ata_registrada: DataTypes.BOOLEAN,
    pauta: DataTypes.STRING(5000),
    compromissos_concluidos: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Reuniao',
  });
  return Reuniao;
};