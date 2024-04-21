'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite)
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username is already registered. Please input another username"
      },
      validate: {
        notNull: {
          msg: "Please input username!"
        },
        notEmpty: {
          msg: "Please input username!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email is already registered. Please input another email"
      },
      validate: {
        notNull: {
          msg: "Please input email!"
        },
        notEmpty: {
          msg: "Please input email!"
        },
        isEmail: {
          msg: "Must be in email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please input password!"
        },
        notEmpty: {
          msg: "Pleae input password!"
        },
        len: {
          args: [8, 20],
          msg: "Password must contain at least 8 characters"
        }
      }
    },
    phoneNumber: DataTypes.INTEGER,
    address: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};