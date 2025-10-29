'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status.hasMany(models.Tarefa, { foreignKey: 'status_id' });
      Status.hasMany(models.Projeto, { foreignKey: 'status_id' });
      Status.hasMany(models.Sub_Tarefa, { foreignKey: 'status_id' });
      Status.hasMany(models.Sima, { foreignKey: 'status_id' });
      Status.hasMany(models.Atracao, { foreignKey: 'status_id',  as: 'ass_status_atracao' });
      Status.hasMany(models.FDI, { foreignKey: 'status_id',  as: 'ass_status_fdi' });      
    }
  }
  Status.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};