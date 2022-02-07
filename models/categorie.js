'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    static associate(models) {
      Categorie.hasMany(models.Collection, {
        sourceKey: 'id',
        foreignKey: 'CategoryId',
      });
    }
  }
  Categorie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          argv: true,
          msg: 'Categorie name must unique',
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Categoire name cannot be empty',
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
      modelName: 'Categorie',
    }
  );
  return Categorie;
};
