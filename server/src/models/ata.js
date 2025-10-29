'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Atas.belongsTo(models.Reuniao, { foreignKey: 'reuniao_id',  as: 'ass_register_meet'})
    }
  }
  Atas.init({
    ata: DataTypes.STRING(5000),
  }, {
    sequelize,
    modelName: 'Atas',
  });
  return Atas;
};