'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    static associate(models) {
      Markdown.belongsTo(models.Product, { foreignKey: 'product_id', as: 'infos' })
    }
  }
  Markdown.init(
    {
      product_id: DataTypes.INTEGER,
      content: DataTypes.TEXT('long')
    },
    {
      sequelize,
      modelName: 'Markdown'
    }
  )
  return Markdown
}
