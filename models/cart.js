'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'UserId',
      });
      Cart.belongsTo(models.Product, {
        targetKey: 'id',
        foreignKey: 'ProductId',
      });
      Cart.belongsTo(models.History, {
        targetKey: 'id',
        foreignKey: 'UserId',
      });
    }
  }
  Cart.init(
    {
      UserId: DataTypes.UUID,
      ProductId: DataTypes.UUID,
      isDropShipping: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Cart status isDropShipping cannot be empty',
          },
        },
      },
      shippedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Cart shipped date cannot be empty',
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Cart quantity cannot be empty',
          },
          min: {
            args: [0],
            msg: 'Quantity cannot be less than zero',
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Cart status cannot be empty',
          },
        },
      },
      receiver: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Cart reciver cannot be empty',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4();
          instance.status = 'unpaid';
        },
      },
      sequelize,
      modelName: 'Cart',
    }
  );
  return Cart;
};
