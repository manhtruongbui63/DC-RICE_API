'use strict'
const { Model } = require('sequelize')
import ApiError from '@/utils/ApiError'
const { StatusCodes } = require('http-status-codes')
const _ = require('lodash')
const Joi = require('joi')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Variant, { foreignKey: 'product_id', as: 'variants' })
      Product.hasMany(models.Attribute, { foreignKey: 'product_id', as: 'attributes' })
      Product.hasMany(models.Image, { foreignKey: 'product_id', as: 'images' })
      Product.hasOne(models.Markdown, { foreignKey: 'product_id', as: 'infos' })
      Product.belongsToMany(models.Category, {
        through: 'Product_Category',
        foreignKey: 'product_id',
        otherKey: 'category_id'
      })
    }
  }

  const productSchema = Joi.object({
    name: Joi.string().required().min(3).max(256).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().allow(null, '').optional().min(10).max(256).trim().strict(),
    thumb_src: Joi.string().required().max(256).trim().strict(),
    thumb_alt: Joi.string().allow(null, '').optional().min(3).max(256).trim().strict(),
    status: Joi.string()
      .valid('active', 'pending', 'inactive')
      .default('pending')
      .required()
      .trim()
      .strict(),
    created_at: Joi.date().timestamp('javascript').default(Date.now),
    updated_at: Joi.date().timestamp('javascript').default(Date.now),
    deleted_at: Joi.date().timestamp('javascript').default(null)
  })

  Product.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      thumb_src: DataTypes.STRING,
      thumb_alt: DataTypes.STRING,
      status: DataTypes.ENUM('active', 'pending', 'inactive')
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: 'Product',
      hooks: {
        beforeValidate: (product, options) => {
          const { error } = productSchema.validate(_.omit(product.toJSON(), 'id'), {
            abortEarly: false
          })
          if (error) {
            throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
          }
        }
      }
    }
  )
  return Product
}
