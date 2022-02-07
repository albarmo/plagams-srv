'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      Collection.belongsTo(models.Categorie, {
        targetKey: 'id',
        foreignKey: 'CategoryId',
      });
      Collection.hasMany(models.Product, {
        sourceKey: 'id',
        foreignKey: 'CollectionId',
      });
    }
  }
  Collection.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Collection name cannot be empty',
          },
        },
      },
      ProductId: DataTypes.UUID,
      CategoryId: DataTypes.UUID,
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Collection image cannot be empty',
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
      modelName: 'Collection',
    }
  );
  return Collection;
};
