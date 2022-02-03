'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Cart, {
        sourceKey: 'id',
        foreignKey: 'UserId',
      });
      User.hasMany(models.Wishlist, {
        sourceKey: 'id',
        foreignKey: 'UserId',
      });
    }
  }
  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'User fullname cannot be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          argv: true,
          msg: 'email is already in use',
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email cannot be empty',
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          argv: true,
          msg: 'phone number is already in use',
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'User phone number cannot be empty',
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'User address cannot be empty',
          },
        },
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'User region cannot be empty',
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'User gender cannot be empty',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty',
          },
          len: {
            args: [5, 30],
            msg: 'Minimum length of password is 5',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4();
          instance.password = hashPassword(instance.password);
          instance.type = 'customer';
        },
        beforeUpdate(instance) {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
