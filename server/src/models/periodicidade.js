'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Periodicidade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Periodicidade.hasMany(models.Reuniao, { foreignKey: 'periodicidade',  as: 'ass_periodicidade_meet' });
    }
  }
  Periodicidade.init({
    periodicidade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Periodicidade',
  });
  return Periodicidade;
};