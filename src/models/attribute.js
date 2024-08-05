'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    static associate(models) {
      Attribute.belongsTo(models.Product, { foreignKey: 'product_id', as: 'attributes' })
    }
  }
  Attribute.init(
    {
      product_id: DataTypes.INTEGER,
      k: DataTypes.STRING,
      v: DataTypes.STRING,
      status: DataTypes.ENUM('active', 'pending', 'inactive')
    },
    {
      sequelize,
      modelName: 'Attribute'
    }
  )
  return Attribute
}
