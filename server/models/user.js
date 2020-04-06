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
    email: {
      type: DataTypes.STRING,
      validate: {
        isUnique: (value, next) => {
          User.findOne({
            where: {
              email: value
            }
          }).then(data => {
            if(data) {
              next('Email has been registered');
            } else {
              next();
            }
          })
        }
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      },
      beforeUpdate: (user, options) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      }
    }
  });
  User.associate = function (models) {
    User.hasMany(models.Food);
  };
  return User;
};