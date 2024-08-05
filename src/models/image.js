'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Product, { foreignKey: 'product_id', as: 'images' })
    }
  }
  Image.init(
    {
      product_id: DataTypes.INTEGER,
      image_src: DataTypes.STRING,
      image_alt: DataTypes.STRING,
      status: DataTypes.ENUM('active', 'pending', 'inactive')
    },
    {
      sequelize,
      modelName: 'Image'
    }
  )
  return Image
}
