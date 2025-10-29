'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projeto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Projeto.belongsTo(models.Users, { foreignKey: 'responsavel_id', as: 'ass_project_res'});
      // Projeto.belongsTo(models.Users, { foreignKey: 'criadoPor_id', as: 'ass_project_create'})
      // Projeto.belongsTo(models.Users, { foreignKey: 'coordenacao_id', as: 'ass_project_coord'})
      Projeto.belongsTo(models.Coordenadorias, { foreignKey: 'coord_id', as: 'ass_project_coordenadoria'})
      Projeto.belongsTo(models.Secretaria_Executivas, { foreignKey: 'sexec_id', as : 'ass_project_sexec'})
      // Projeto.belongsTo(models.Users, { foreignKey: 'gerente_id', as: 'ass_project_gerc'})
      Projeto.hasMany(models.Reuniao, { foreignKey: 'projeto_id' });
      Projeto.hasMany(models.Tarefa, { foreignKey: 'projeto_id', as: 'ass_project_tarefa' });
      Projeto.hasMany(models.Users_Projects, { foreignKey: 'ProjetoId', as: 'ass_project' });
      Projeto.belongsTo(models.Status, { foreignKey: 'status_id', as: 'ass_project_status'});
    }
  }
  Projeto.init({
    name: DataTypes.STRING,
    descricao: DataTypes.STRING(5000),
    data_inicio: DataTypes.DATEONLY,
    previsao_conclusao: DataTypes.DATEONLY,
    projeto_arquivado: DataTypes.BOOLEAN,
    motivo_arquivado: DataTypes.STRING,
    numero_programa: DataTypes.STRING,
    valor: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Projeto',
  });
  return Projeto;
};