'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {}
  }
  Discount.init(
    {
      type: DataTypes.ENUM('fixed', 'rate'),
      value: DataTypes.DECIMAL(10, 2),
      end_date: DataTypes.DATE,
      description: DataTypes.STRING,
      status: DataTypes.ENUM('active', 'pending', 'inactive')
    },
    {
      sequelize,
      modelName: 'Discount'
    }
  )
  return Discount
}
