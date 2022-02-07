'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      Wishlist.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'UserId',
      });
      Wishlist.belongsTo(models.Product, {
        targetKey: 'id',
        foreignKey: 'ProductId',
      });
    }
  }
  Wishlist.init(
    {
      UserId: DataTypes.UUID,
      ProductId: DataTypes.UUID,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4();
        },
      },
      sequelize,
      modelName: 'Wishlist',
    }
  );
  return Wishlist;
};
