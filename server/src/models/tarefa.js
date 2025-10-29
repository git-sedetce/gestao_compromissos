'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarefa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tarefa.belongsTo(models.Users, { foreignKey: 'responsavel_id', as: 'ass_tarefa_users' });
      Tarefa.belongsTo(models.Projeto, { foreignKey: 'projeto_id'});
      Tarefa.hasMany(models.Sub_Tarefa, { foreignKey: 'tarefa_id', as: 'ass_tarefa_task' });
      Tarefa.belongsTo(models.Status, { foreignKey: 'status_id', as: 'ass_tarefa_status'});
      Tarefa.belongsTo(models.Reuniao, { foreignKey: 'reuniao_id', as: 'ass_task_meet' });
      
    }
  }
  Tarefa.init({
    nome_ordem: DataTypes.STRING,
    data_inicial: DataTypes.DATEONLY,
    prazo: DataTypes.INTEGER,
    data_conclusao: DataTypes.DATEONLY,
    dias_trabalhado: DataTypes.INTEGER,
    status_conclusao: DataTypes.STRING,
    execucao: DataTypes.INTEGER,
    tarefa_arquivada: DataTypes.BOOLEAN,
    mapp: DataTypes.STRING,
    valor_estimado: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tarefa',
  });
  return Tarefa;
};