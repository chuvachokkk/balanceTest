'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init(
    {
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
