'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, { foreignKey: 'user_id', as: 'addresses' })
    }
  }
  Address.init(
    {
      user_id: DataTypes.INTEGER,
      full_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      line: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Address'
    }
  )
  return Address
}
