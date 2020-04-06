'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Food extends Model {

  }
  Food.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ingredients: DataTypes.STRING,
    tag: DataTypes.STRING
  }, {sequelize});
  Food.associate = function(models) {
    // associations can be defined here
  };
  return Food;
};