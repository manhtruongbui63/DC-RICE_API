'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_Role extends Model {
    static associate(models) {
      User_Role.belongsTo(models.User, {
        as: 'users',
        foreignKey: 'user_id'
      })
      User_Role.belongsTo(models.Role, {
        as: 'roles',
        foreignKey: 'role_id'
      })
    }
  }
  User_Role.init(
    {
      user_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'User_Role'
    }
  )
  return User_Role
}
