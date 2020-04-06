'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Food extends Model {

  }
  Food.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title is required'
        },
        notNull: {
          msg: 'title is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'price must be number'
        },
        notEmpty: {
          msg: 'price is required'
        },
        notNull: {
          msg: 'price is required'
        }
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'ingredients is required'
        },
        notNull: {
          msg: 'ingredients is required'
        }
      }
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'tag is required'
        },
        notNull: {
          msg: 'tag is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'userid is required'
        },
        notNull: {
          msg: 'userid is required'
        }
      }
    }
  }, {sequelize});
  Food.associate = function(models) {
    Food.belongsTo(models.User);
  };
  return Food;
};