'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sub_Tarefa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sub_Tarefa.belongsTo(models.Users, { foreignKey: 'responsavel_id', as: 'ass_task_users'});
      Sub_Tarefa.belongsTo(models.Tarefa, { foreignKey: 'tarefa_id', as: 'ass_task'})
      Sub_Tarefa.belongsTo(models.Status, { foreignKey: 'status_id', as: 'ass_task_status'});
    }
  }
  Sub_Tarefa.init({
    nome_sub_tarefa: DataTypes.STRING,
    data_inicial: DataTypes.DATEONLY,
    prazo: DataTypes.INTEGER,
    data_conclusao: DataTypes.DATEONLY,
    dias_trabalhado: DataTypes.INTEGER,
    status_conclusao: DataTypes.STRING,
    execucao: DataTypes.INTEGER,
    pendencia: DataTypes.STRING,
    tarefa_pendente: DataTypes.INTEGER,
    subtarefa_arquivada: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Sub_Tarefa',
  });
  return Sub_Tarefa;
};