'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: 'User_Role'
      })
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.ENUM('active', 'pending', 'inactive')
    },
    {
      sequelize,
      modelName: 'Role'
    }
  )
  return Role
}
