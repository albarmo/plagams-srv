'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'UserId',
      });
      History.belongsTo(models.Cart, {
        targetKey: 'id',
        foreignKey: 'CartId',
      });
    }
  }
  History.init(
    {
      UserId: DataTypes.UUID,
      CartId: DataTypes.UUID,
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'History checkout date cannot be empty',
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'History status  cannot be empty',
          },
        },
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'History payment date cannot be empty',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4();
        },
      },
      sequelize,
      modelName: 'History',
    }
  );
  return History;
};
