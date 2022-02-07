'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Collection, {
        targetKey: 'id',
        foreignKey: 'CollectionId',
      });
      Product.hasMany(models.Cart, {
        sourceKey: 'id',
        foreignKey: 'ProductId',
      });
      Product.hasMany(models.Wishlist, {
        sourceKey: 'id',
        foreignKey: 'ProductId',
      });
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          argv: true,
          msg: 'Product name must unique',
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Product's name cannot be empty",
          },
        },
      },
      CollectionId: DataTypes.UUID,
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Product colors name cannot be empty',
          },
        },
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Product size cannot be empty',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Product description cannot be empty',
          },
          len: {
            args: [20, 500],
            msg: 'Minimum character of product description is more than 20 and less than 500',
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Input stock cannot be empty',
          },
          min: {
            args: [0],
            msg: 'Stock cannot be less than zero',
          },
        },
      },
      images: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Product's image cannot be empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Input price cannot be empty',
          },
          min: {
            args: [1],
            msg: 'Price cannot be less than one',
          },
        },
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Product weight cannot be empty',
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
      modelName: 'Product',
    }
  );
  return Product;
};
