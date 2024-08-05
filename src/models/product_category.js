'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {
    static associate(models) {
      Product_Category.belongsTo(models.Product, { as: 'products', foreignKey: 'product_id' })
      Product_Category.belongsTo(models.Category, { as: 'categories', foreignKey: 'category_id' })
    }
  }
  Product_Category.init(
    {
      product_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Product_Category'
    }
  )
  return Product_Category
}
