'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class User extends Model {
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        if (user.password) {
          bcrypt.hashSync(user.password, 10);
        }
      },
      beforeUpdate: (user, options) => {
        if (user.password) {
          bcrypt.hashSync(user.password, 10);
        }
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};